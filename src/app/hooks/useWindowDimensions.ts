import { useState, useEffect } from 'react';
import { Dimensions } from '../types';

export const useWindowDimensions = (): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return dimensions;
}; 