import { createContext, useContext, useState } from 'react';

const HighlightContext = createContext();

export function HighlightProvider({ children }) {
  const [highlightedSkill, setHighlightedSkill] = useState(null);

  return (
    <HighlightContext.Provider value={{ highlightedSkill, setHighlightedSkill }}>
      {children}
    </HighlightContext.Provider>
  );
}

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
}; 