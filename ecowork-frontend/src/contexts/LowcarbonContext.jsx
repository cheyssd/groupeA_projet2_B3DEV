import { createContext, useState, useContext, useEffect } from 'react';

const LowCarbonContext = createContext();

export function LowCarbonProvider({ children }) {
  const [isLowCarbon, setIsLowCarbon] = useState(() => {
    // Récupérer depuis localStorage au démarrage
    return localStorage.getItem('lowCarbonMode') === 'true';
  });

  const toggleLowCarbon = () => {
    setIsLowCarbon(prev => {
      const newValue = !prev;
      localStorage.setItem('lowCarbonMode', newValue);
      return newValue;
    });
  };

  // Appliquer les styles CSS globaux
  useEffect(() => {
    if (isLowCarbon) {
      document.documentElement.classList.add('low-carbon-mode');
    } else {
      document.documentElement.classList.remove('low-carbon-mode');
    }
  }, [isLowCarbon]);

  return (
    <LowCarbonContext.Provider value={{ isLowCarbon, toggleLowCarbon }}>
      {children}
    </LowCarbonContext.Provider>
  );
}

export function useLowCarbon() {
  const context = useContext(LowCarbonContext);
  if (!context) {
    throw new Error('useLowCarbon must be used within LowCarbonProvider');
  }
  return context;
}