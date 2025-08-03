import Confetti from 'react-confetti';
import { Dimensions } from '../types';

interface ConfettiProps {
  dimensions: Dimensions;
  isActive: boolean;
}

export const ConfettiComponent = ({ dimensions, isActive }: ConfettiProps) => {
  if (!isActive) return null;

  return (
    <Confetti 
      width={dimensions.width} 
      height={dimensions.height} 
      numberOfPieces={500} 
      recycle={false} 
    />
  );
}; 