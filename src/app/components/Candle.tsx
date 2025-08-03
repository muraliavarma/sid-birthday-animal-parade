interface CandleProps {
  index: number;
  left: string;
  isBlown: boolean;
  onBlow: (index: number) => void;
}

export const Candle = ({ index, left, isBlown, onBlow }: CandleProps) => (
  <div
    className="absolute top-4 cursor-pointer"
    style={{ left }}
    onClick={() => onBlow(index)}
  >
    {/* Candle body */}
    <div className="w-2 h-8 bg-white rounded-full border border-gray-300"></div>
    {/* Flame appears only if not blown out */}
    {!isBlown && (
      <div className="w-3 h-4 bg-orange-400 rounded-full animate-pulse mx-auto -mt-4"></div>
    )}
  </div>
); 