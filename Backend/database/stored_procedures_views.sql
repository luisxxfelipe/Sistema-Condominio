-- VIEWS para o Sistema de Gestão de Condomínios

-- VIEW 1: Resumo de Ocupação das Unidades
CREATE OR REPLACE VIEW vw_ocupacao_unidades AS
SELECT 
    u.id,
    u.bloco,
    u.numero,
    u.tipo,
    COUNT(m.id) as total_moradores,
    CASE 
        WHEN COUNT(m.id) > 0 THEN 'OCUPADA'
        ELSE 'VAZIA'
    END as status_ocupacao,
    STRING_AGG(m.nome, ', ') as nomes_moradores
FROM Unidade u
LEFT JOIN Morador m ON u.id = m.unidadeId
GROUP BY u.id, u.bloco, u.numero, u.tipo
ORDER BY u.bloco, u.numero;

-- VIEW 2: Relatório Financeiro por Unidade
CREATE OR REPLACE VIEW vw_financeiro_unidades AS
SELECT 
    u.id as unidade_id,
    u.bloco,
    u.numero,
    COUNT(b.id) as total_boletos,
    COUNT(CASE WHEN b.status = 'PAGO' THEN 1 END) as boletos_pagos,
    COUNT(CASE WHEN b.status = 'PENDENTE' THEN 1 END) as boletos_pendentes,
    COALESCE(SUM(b.valor), 0) as valor_total,
    COALESCE(SUM(CASE WHEN b.status = 'PAGO' THEN b.valor END), 0) as valor_pago,
    COALESCE(SUM(CASE WHEN b.status = 'PENDENTE' THEN b.valor END), 0) as valor_pendente,
    CASE 
        WHEN COUNT(b.id) > 0 THEN 
            ROUND((COUNT(CASE WHEN b.status = 'PAGO' THEN 1 END) * 100.0 / COUNT(b.id)), 2)
        ELSE 0
    END as percentual_pagamento
FROM Unidade u
LEFT JOIN Boleto b ON u.id = b.unidadeId
GROUP BY u.id, u.bloco, u.numero
ORDER BY u.bloco, u.numero;

-- STORED PROCEDURES/FUNCTIONS

-- FUNCTION 1: Validar CPF (implementação básica)
CREATE OR REPLACE FUNCTION validar_cpf(cpf_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Remove caracteres não numéricos
    cpf_input := REGEXP_REPLACE(cpf_input, '[^0-9]', '', 'g');
    
    -- Verifica se tem 11 dígitos
    IF LENGTH(cpf_input) != 11 THEN
        RETURN FALSE;
    END IF;
    
    -- Verifica se não são todos os dígitos iguais
    IF cpf_input ~ '^(\d)\1{10}$' THEN
        RETURN FALSE;
    END IF;
    
    -- Para uma validação completa, seria necessário implementar o algoritmo completo do CPF
    -- Esta é uma versão simplificada
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 2: Gerar Boletos em Lote para um Mês
CREATE OR REPLACE FUNCTION gerar_boletos_mes(
    mes_referencia TEXT,
    valor_condominio DECIMAL(10,2),
    data_vencimento DATE
)
RETURNS INTEGER AS $$
DECLARE
    unidade_record RECORD;
    boletos_criados INTEGER := 0;
BEGIN
    -- Loop através de todas as unidades
    FOR unidade_record IN 
        SELECT id FROM Unidade 
    LOOP
        -- Verifica se já existe boleto para esta unidade neste mês
        IF NOT EXISTS (
            SELECT 1 FROM Boleto 
            WHERE unidadeId = unidade_record.id 
            AND mesRef = mes_referencia
        ) THEN
            -- Cria o boleto
            INSERT INTO Boleto (mesRef, valor, status, vencimento, unidadeId)
            VALUES (mes_referencia, valor_condominio, 'PENDENTE', data_vencimento, unidade_record.id);
            
            boletos_criados := boletos_criados + 1;
        END IF;
    END LOOP;
    
    RETURN boletos_criados;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION 3: Verificar Disponibilidade de Área Comum
CREATE OR REPLACE FUNCTION verificar_disponibilidade_area(
    area_id INTEGER,
    data_reserva DATE,
    horario_inicio TIME,
    horario_fim TIME,
    reserva_excluir INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    conflitos INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflitos
    FROM Reserva r
    WHERE r.areaComumId = area_id
    AND r.data = data_reserva
    AND (reserva_excluir IS NULL OR r.id != reserva_excluir)
    AND (
        -- Horário de início está dentro de uma reserva existente
        (r.horarioInicio <= horario_inicio::TEXT AND r.horarioFim > horario_inicio::TEXT)
        OR
        -- Horário de fim está dentro de uma reserva existente  
        (r.horarioInicio < horario_fim::TEXT AND r.horarioFim >= horario_fim::TEXT)
        OR
        -- A nova reserva engloba uma reserva existente
        (r.horarioInicio >= horario_inicio::TEXT AND r.horarioFim <= horario_fim::TEXT)
    );
    
    RETURN conflitos = 0;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER para registrar logs automaticamente (exemplo)
CREATE OR REPLACE FUNCTION trigger_log_transacao()
RETURNS TRIGGER AS $$
BEGIN
    -- Registra operação de INSERT
    IF TG_OP = 'INSERT' THEN
        INSERT INTO LogTransacao (usuario, acao, sql, usuarioId, timestamp)
        VALUES (
            COALESCE(current_setting('app.current_user_name', true), 'Sistema'),
            TG_OP || ' em ' || TG_TABLE_NAME,
            'INSERT em ' || TG_TABLE_NAME || ' ID: ' || NEW.id,
            COALESCE(current_setting('app.current_user_id', true)::INTEGER, 1),
            NOW()
        );
        RETURN NEW;
    END IF;
    
    -- Registra operação de UPDATE
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO LogTransacao (usuario, acao, sql, usuarioId, timestamp)
        VALUES (
            COALESCE(current_setting('app.current_user_name', true), 'Sistema'),
            TG_OP || ' em ' || TG_TABLE_NAME,
            'UPDATE em ' || TG_TABLE_NAME || ' ID: ' || NEW.id,
            COALESCE(current_setting('app.current_user_id', true)::INTEGER, 1),
            NOW()
        );
        RETURN NEW;
    END IF;
    
    -- Registra operação de DELETE
    IF TG_OP = 'DELETE' THEN
        INSERT INTO LogTransacao (usuario, acao, sql, usuarioId, timestamp)
        VALUES (
            COALESCE(current_setting('app.current_user_name', true), 'Sistema'),
            TG_OP || ' em ' || TG_TABLE_NAME,
            'DELETE em ' || TG_TABLE_NAME || ' ID: ' || OLD.id,
            COALESCE(current_setting('app.current_user_id', true)::INTEGER, 1),
            NOW()
        );
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Aplicar triggers nas tabelas principais
DROP TRIGGER IF EXISTS tr_log_morador ON Morador;
CREATE TRIGGER tr_log_morador
    AFTER INSERT OR UPDATE OR DELETE ON Morador
    FOR EACH ROW EXECUTE FUNCTION trigger_log_transacao();

DROP TRIGGER IF EXISTS tr_log_unidade ON Unidade;
CREATE TRIGGER tr_log_unidade
    AFTER INSERT OR UPDATE OR DELETE ON Unidade
    FOR EACH ROW EXECUTE FUNCTION trigger_log_transacao();

DROP TRIGGER IF EXISTS tr_log_boleto ON Boleto;
CREATE TRIGGER tr_log_boleto
    AFTER INSERT OR UPDATE OR DELETE ON Boleto
    FOR EACH ROW EXECUTE FUNCTION trigger_log_transacao();

DROP TRIGGER IF EXISTS tr_log_reserva ON Reserva;
CREATE TRIGGER tr_log_reserva
    AFTER INSERT OR UPDATE OR DELETE ON Reserva
    FOR EACH ROW EXECUTE FUNCTION trigger_log_transacao();

-- PROCEDURE para limpeza de logs antigos
CREATE OR REPLACE FUNCTION limpar_logs_antigos(dias_manter INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    data_limite DATE;
    registros_removidos INTEGER;
BEGIN
    data_limite := CURRENT_DATE - INTERVAL '1 day' * dias_manter;
    
    DELETE FROM LogTransacao 
    WHERE timestamp < data_limite;
    
    GET DIAGNOSTICS registros_removidos = ROW_COUNT;
    
    RETURN registros_removidos;
END;
$$ LANGUAGE plpgsql;

-- PROCEDURE para relatório de inadimplência
CREATE OR REPLACE FUNCTION relatorio_inadimplencia()
RETURNS TABLE (
    unidade_bloco TEXT,
    unidade_numero TEXT,
    total_em_atraso DECIMAL(10,2),
    meses_atrasados INTEGER,
    contato_morador TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.bloco,
        u.numero,
        SUM(b.valor) as total_em_atraso,
        COUNT(b.id)::INTEGER as meses_atrasados,
        STRING_AGG(m.telefone, ', ') as contato_morador
    FROM Unidade u
    LEFT JOIN Boleto b ON u.id = b.unidadeId
    LEFT JOIN Morador m ON u.id = m.unidadeId
    WHERE b.status = 'PENDENTE' 
    AND b.vencimento < CURRENT_DATE
    GROUP BY u.id, u.bloco, u.numero
    HAVING SUM(b.valor) > 0
    ORDER BY total_em_atraso DESC;
END;
$$ LANGUAGE plpgsql;
