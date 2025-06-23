-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senhaHash` VARCHAR(191) NOT NULL,
    `tipoPerfil` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Morador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `unidadeId` INTEGER NULL,

    UNIQUE INDEX `Morador_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bloco` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visitante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `dataVisita` DATETIME(3) NOT NULL,
    `unidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrestadorServico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `servico` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `entrada` DATETIME(3) NOT NULL,
    `saida` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AreaComum` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `regras` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `horarioInicio` VARCHAR(191) NOT NULL,
    `horarioFim` VARCHAR(191) NOT NULL,
    `unidadeId` INTEGER NOT NULL,
    `areaComumId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Boleto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mesRef` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `vencimento` DATETIME(3) NOT NULL,
    `unidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aviso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogTransacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `sql` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Morador` ADD CONSTRAINT `Morador_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visitante` ADD CONSTRAINT `Visitante_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_areaComumId_fkey` FOREIGN KEY (`areaComumId`) REFERENCES `AreaComum`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Boleto` ADD CONSTRAINT `Boleto_unidadeId_fkey` FOREIGN KEY (`unidadeId`) REFERENCES `Unidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogTransacao` ADD CONSTRAINT `LogTransacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
