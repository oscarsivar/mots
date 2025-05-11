import { Quiz } from '../components/Quiz/Quiz';
import { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export const Practice = () => {
  const { words } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [score, setScore] = useState(0); // Track the score
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current word index
  const [isFinished, setIsFinished] = useState(false); // Track if the quiz is finished

  const handleNextWord = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct
    }

    if (currentIndex + 1 < words.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next word
    } else {
      setIsFinished(true); // Mark the quiz as finished
    }
  };

  const handleTryAgain = () => {
    setScore(0); // Reset the score
    setCurrentIndex(0); // Reset the index
    setIsFinished(false); // Reset the finished state
  };

  if (words.length === 0) {
    return (
      <Box className="no-words">
        <Typography variant="h5" gutterBottom>
          No hay palabras para practicar
        </Typography>
        <Typography variant="body1" gutterBottom>
          Agrega palabras en la página principal primero
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          className="return-button"
        >
          Volver al Inicio
        </Button>
      </Box>
    );
  }

  if (isFinished) {
    return (
      <Box className="practice-container">
        <Typography variant="h4" gutterBottom className="practice-title">
          ¡Quiz Finalizado!
        </Typography>
        <Typography variant="h5" gutterBottom className="practice-score">
          Tu puntuación: {score} / {words.length}
        </Typography>
        <Button
          variant="contained"
          onClick={handleTryAgain}
          className="try-again-button"
        >
          Intentar de Nuevo
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          className="return-button"
        >
          Volver al Inicio
        </Button>
      </Box>
    );
  }

  return (
    <Box className="practice-container">
      <Box component="header" className="practice-header">
        <Typography variant="h4" gutterBottom className="practice-title">
          Modo Práctica
        </Typography>
        <Typography variant="subtitle1" className="practice-subtitle">
          Selecciona la traducción correcta en francés
        </Typography>
      </Box>

      <Quiz
        currentWord={words[currentIndex]}
        onNextWord={handleNextWord}
        currentIndex={currentIndex} // Pass currentIndex
        words={words} // Pass words
      />

      <Box component="footer" className="practice-footer">
        <Typography variant="body2" className="practice-progress">
          Palabra {currentIndex + 1} de {words.length}
        </Typography>
      </Box>
    </Box>
  );
};