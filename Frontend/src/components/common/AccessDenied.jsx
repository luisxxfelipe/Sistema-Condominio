import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';

const AccessDenied = ({ message = "Você não tem permissão para acessar esta página." }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        p: 3 
      }}
    >
      <Paper 
        sx={{ 
          p: 6, 
          textAlign: 'center', 
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: 3
        }}
      >
        <LockIcon 
          sx={{ 
            fontSize: 64, 
            color: 'text.secondary',
            mb: 2 
          }} 
        />
        <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
          Acesso Negado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AccessDenied;
