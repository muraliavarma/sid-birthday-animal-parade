export const TwinklingStars = () => {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 text-4xl animate-pulse">⭐</div>
      <div 
        className="absolute top-1/3 right-1/3 text-3xl animate-pulse" 
        style={{ animationDelay: '0.3s' }}
      >
        ⭐
      </div>
      <div 
        className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse" 
        style={{ animationDelay: '0.6s' }}
      >
        ⭐
      </div>
      <div 
        className="absolute bottom-1/4 right-1/4 text-3xl animate-pulse" 
        style={{ animationDelay: '0.9s' }}
      >
        ⭐
      </div>
    </>
  );
}; 