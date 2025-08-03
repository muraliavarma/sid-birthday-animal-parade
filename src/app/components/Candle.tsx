interface CandleProps {
  index: number;
  left: string;
  isBlown: boolean;
  onBlow: (index: number) => void;
}

export const Candle = ({ index, left, isBlown, onBlow }: CandleProps) => (
  <div
    className={`absolute top-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10 ${left}`}
    onClick={() => onBlow(index)}
    title="Click to blow out!"
  >
    {/* Candle body */}
    <div className="w-2 h-8 bg-white rounded-full border border-gray-300 shadow-lg relative">
      {/* Flame appears only if not blown out */}
      {!isBlown && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          {/* Main flame */}
          <div className="w-3 h-4 bg-orange-400 rounded-full animate-pulse relative z-10 shadow-lg">
            {/* Glow effect centered on the flame */}
            <div className="absolute w-6 h-6 bg-orange-200 rounded-full animate-pulse -top-1 -left-1.5 opacity-60"></div>
            {/* Inner flame */}
            <div className="w-2 h-3 bg-yellow-300 rounded-full animate-pulse absolute -top-1 left-1/2 transform -translate-x-1/2 z-20 shadow-lg"></div>
          </div>
        </div>
      )}
    </div>
    
    {/* Click indicator - subtle pulsing ring when not blown */}
    {!isBlown && (
      <div className="absolute w-8 h-8 border-2 border-orange-300 rounded-full -top-1 -left-3 animate-ping opacity-30"></div>
    )}
  </div>
); 