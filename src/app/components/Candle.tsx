interface CandleProps {
  index: number;
  left: string;
  isBlown: boolean;
  onBlow: (index: number) => void;
}

export const Candle = ({ index, left, isBlown, onBlow }: CandleProps) => (
  <div
    className={`absolute top-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10 ${left}`}
    onClick={() => onBlow(index)}
    title="Click to blow out!"
  >
    {/* Candle body with better styling */}
    <div className="w-2.5 h-10 bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-full border border-yellow-200 shadow-lg relative">
      {/* Candle texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-50/60 to-yellow-100/60 rounded-full"></div>
      
      {/* Candle wick */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-800 rounded-full"></div>
      
      {/* Flame appears only if not blown out */}
      {!isBlown && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          {/* Outer glow */}
          <div className="absolute w-8 h-8 bg-orange-200 rounded-full animate-pulse -top-2 -left-2.5 opacity-40"></div>
          
          {/* Main flame */}
          <div className="w-4 h-6 bg-gradient-to-b from-orange-400 to-orange-500 rounded-full animate-pulse relative z-10 shadow-lg">
            {/* Inner flame glow */}
            <div className="absolute w-6 h-6 bg-orange-300 rounded-full animate-pulse -top-1 -left-1 opacity-70"></div>
            
            {/* Inner flame */}
            <div className="w-2.5 h-4 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-full animate-pulse absolute -top-1 left-1/2 transform -translate-x-1/2 z-20 shadow-lg">
              {/* Bright center */}
              <div className="w-1.5 h-2.5 bg-yellow-200 rounded-full animate-pulse absolute -top-0.5 left-1/2 transform -translate-x-1/2 z-30"></div>
            </div>
            
            {/* Flame tip */}
            <div className="w-1 h-2 bg-yellow-100 rounded-full animate-pulse absolute -top-2 left-1/2 transform -translate-x-1/2 z-30"></div>
          </div>
        </div>
      )}
      
      {/* Melted wax effect */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-yellow-50 rounded-full opacity-60"></div>
    </div>
    
    {/* Click indicator - subtle pulsing ring when not blown */}
    {!isBlown && (
      <div className="absolute w-10 h-10 border-2 border-orange-300 rounded-full -top-1 -left-3.5 animate-ping opacity-30"></div>
    )}
    
    {/* Candle shadow */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"></div>
  </div>
); 