import { WordInput } from '../components/WordInput/WordInput';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

export const Home = () => {
  const { words } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography
          variant="h3"
          sx={{ color: '#0055A4', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Francés Fácil
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#EF4135', fontStyle: 'italic' }}
        >
          Agrega hasta 20 palabras con su traducción al español
        </Typography>
      </header>

      <WordInput />

      {words.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: '#0055A4', fontWeight: 'bold', marginBottom: '20px' }}
          >
            Palabras ({words.length}/20)
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#EF4135',
              color: '#FFFFFF',
              marginRight: '10px',
              '&:hover': { backgroundColor: '#0055A4' },
            }}
            onClick={() => navigate('/practice')}
          >
            Comenzar Práctica
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#EF4135',
              color: '#EF4135',
              '&:hover': { borderColor: '#0055A4', color: '#0055A4' },
            }}
            onClick={() => {
              if (confirm('¿Borrar todas las palabras?')) {
                localStorage.removeItem('frenchWords');
                window.location.reload();
              }
            }}
          >
            Limpiar Lista
          </Button>
        </Box>
      )}

      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography
          variant="body2"
          sx={{ color: '#0055A4', fontStyle: 'italic' }}
        >
          Consejo: Empieza con palabras básicas como "Bonjour" (Hola)
        </Typography>
      </footer>
    </Box>
  );
};