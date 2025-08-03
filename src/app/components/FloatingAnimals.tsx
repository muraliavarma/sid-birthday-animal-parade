interface FloatingAnimalsProps {
  size?: 'small' | 'large';
}

export const FloatingAnimals = ({ size = 'large' }: FloatingAnimalsProps) => {
  const textSize = size === 'large' ? 'text-8xl' : 'text-6xl';
  const textSize2 = size === 'large' ? 'text-9xl' : 'text-7xl';

  return (
    <>
      <span className={`absolute top-6 left-6 ${textSize} animate-bounce`}>🦁</span>
      <span 
        className={`absolute top-16 right-8 ${textSize2} animate-bounce`} 
        style={{animationDelay:'0.4s'}}
      >
        🐵
      </span>
      <span 
        className={`absolute bottom-24 left-16 ${textSize} animate-bounce`} 
        style={{animationDelay:'0.8s'}}
      >
        🐯
      </span>
      <span 
        className={`absolute bottom-10 right-12 ${textSize2} animate-bounce`} 
        style={{animationDelay:'1.2s'}}
      >
        🐼
      </span>
    </>
  );
}; 