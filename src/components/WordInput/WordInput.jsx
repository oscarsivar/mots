import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

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
    <div className="word-input-container">
      <header>
        <h1>Agregar Palabras</h1>
        <p>Agrega hasta 20 palabras con su traducción al español</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="options-grid">
          <div>
            <input
              type="text"
              placeholder="Francés"
              value={frenchWord}
              onChange={(e) => setFrenchWord(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Español"
              value={spanishWord}
              onChange={(e) => setSpanishWord(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" disabled={words.length >= 20}>
          {words.length >= 20 ? 'Límite alcanzado' : 'Agregar'}
        </button>
      </form>

      <div className="word-list">
        {words.map((word) => (
          <span key={word.id} className="word-badge" style={{ display: 'block' }}>
            {word.french} → {word.spanish}
          </span>
        ))}
      </div>

      {words.length > 0 && (
        <Link to="/practice" className="practice-button">
          Comenzar Práctica
        </Link>
      )}
    </div>
  );
};