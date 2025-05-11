import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const addWord = (newWord) => {
    setWords(prev => [...prev, newWord].slice(0, 20));
  };

  const nextWord = () => {
    setCurrentIndex(prev => (prev + 1) % words.length);
  };

  return (
    <LanguageContext.Provider value={{ 
      words, 
      addWord,
      currentWord: words[currentIndex],
      nextWord,
      currentIndex
    }}>
      {children}
    </LanguageContext.Provider>
  );
};