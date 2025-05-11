import { WordInput } from '../components/WordInput/WordInput';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

export const Home = () => {
  const { words } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: '#FAFAFA', // fondo más claro y suave
        minHeight: '100vh',
        '@media (max-width:600px)': {
          p: 1,
        },
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography
          variant="h3"
          sx={{
            color: '#223A5E', // azul oscuro accesible
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: { xs: '2rem', sm: '2.5rem' },
          }}
        >
          Francés Fácil
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#E57373', // rojo suave
            fontStyle: 'italic',
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Agrega hasta 20 palabras con su traducción al español
        </Typography>
      </header>

      <WordInput />

      {words.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#4F83CC', // azul claro accesible
              fontWeight: 'bold',
              marginBottom: '20px',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
            }}
          >
            Palabras ({words.length}/20)
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#E57373', // rojo suave
              color: '#FFFFFF',
              marginRight: '10px',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#223A5E' }, // azul oscuro al pasar el mouse
            }}
            onClick={() => navigate('/practice')}
          >
            Comenzar Práctica
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#E57373',
              color: '#E57373',
              fontWeight: 'bold',
              '&:hover': { borderColor: '#223A5E', color: '#223A5E' },
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
          sx={{
            color: '#4F83CC', // azul claro
            fontStyle: 'italic',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Consejo: Empieza con palabras básicas como "Bonjour" (Hola)
        </Typography>
      </footer>
    </Box>
  );
};