import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import { Box, Typography, TextField, Button } from '@mui/material';

export const WordInput = () => {
  const { words, addWord } = useContext(LanguageContext);
  const [frenchWord, setFrenchWord] = useState('');
  const [spanishWord, setSpanishWord] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (words.length >= 20) return;

    addWord({
      french: frenchWord.trim(),
      spanish: spanishWord.trim(),
      id: Date.now(),
    });

    setFrenchWord('');
    setSpanishWord('');
  };

  return (
    <Box className="word-input-container">
      <Box component="header" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Agrega hasta 20 palabras con su traducción al español
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
        <Box className="options-grid" sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Francés"
            placeholder="Francés"
            value={frenchWord}
            onChange={(e) => setFrenchWord(e.target.value)}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Español"
            placeholder="Español"
            value={spanishWord}
            onChange={(e) => setSpanishWord(e.target.value)}
            required
            fullWidth
            size="small"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={words.length >= 20}
          fullWidth
        >
          {words.length >= 20 ? 'Límite alcanzado' : 'Agregar'}
        </Button>
      </Box>

      <Box className="word-list" sx={{ mb: 2 }}>
        {words.map((word) => (
          <Typography
            key={word.id}
            className="word-badge"
            sx={{ display: 'block', mb: 1, background: '#E3F2FD', borderRadius: 1, px: 2, py: 1 }}
          >
            {word.french} → {word.spanish}
          </Typography>
        ))}
      </Box>

      {words.length > 0 && (
        <Button
          component={Link}
          to="/practice"
          className="practice-button"
          variant="contained"
          color="secondary"
          fullWidth
        >
          Comenzar Práctica
        </Button>
      )}
    </Box>
  );
};