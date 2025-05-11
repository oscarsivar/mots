import { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { fetchRelatedWords } from '../../services/Synom'; // Import the service

export const Quiz = ({ currentWord, onNextWord, currentIndex, words }) => {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!currentWord) return;

    // Generate options (current word + related alternatives)
    const generateOptions = async () => {
      try {
        // Fetch related words from the Synom service
        const relatedWords = await fetchRelatedWords(currentWord.french);

        // Combine the current word with related words
        const combinedOptions = [currentWord.french, ...relatedWords]
          .filter((option, index, self) => self.indexOf(option) === index) // Remove duplicates
          .sort(() => Math.random() - 0.5); // Shuffle options

        setOptions(combinedOptions);
      } catch (error) {
        console.error('Error fetching related words:', error);
        // Fallback to local options if API call fails
        setOptions([currentWord.french].sort(() => Math.random() - 0.5));
      }
    };

    generateOptions();
    setSelected(null);
  }, [currentWord]);

  const handleSelect = (option) => {
    setSelected(option);
    const isCorrect = option === currentWord.french;
    onNextWord(isCorrect); // Notify parent component
  };

  return (
    <Box className="quiz-container">
      <Typography className="quiz-title" variant="h4" gutterBottom>
        Práctica de Vocabulario
      </Typography>

      <Typography className="quiz-progress" variant="subtitle1">
        Palabra {currentIndex + 1} de {words.length}
      </Typography>

      <Paper className="quiz-question" elevation={3}>
        <Typography className="question-text" variant="h5" gutterBottom>
          ¿Cómo se dice "{currentWord?.spanish}" en francés?
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {options.map((option, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Button
                className={`option-btn ${
                  selected
                    ? option === currentWord.french
                      ? 'correct'
                      : option === selected
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => handleSelect(option)}
                variant="contained"
                fullWidth
                disabled={!!selected}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {selected && (
        <Button
          className="next-btn"
          onClick={() => onNextWord(selected === currentWord.french)}
          variant="contained"
          fullWidth
        >
          Siguiente
        </Button>
      )}
    </Box>
  );
};