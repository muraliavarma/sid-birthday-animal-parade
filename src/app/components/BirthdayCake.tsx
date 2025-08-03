import { Candle } from './Candle';

interface BirthdayCakeProps {
  candlesBlown: boolean[];
  onBlowCandle: (index: number) => void;
}

export const BirthdayCake = ({ candlesBlown, onBlowCandle }: BirthdayCakeProps) => {
  return (
    <div className="mb-4 relative hidden md:block">
      <div className="w-64 h-48 bg-gradient-to-b from-pink-400 to-purple-500 rounded-t-full shadow-2xl relative">
        {/* Cake Layers */}
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-t-full"></div>
        <div className="absolute bottom-16 w-full h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full"></div>

        {/* 5 Candles */}
        <Candle index={0} left="2rem" isBlown={candlesBlown[0]} onBlow={onBlowCandle} />
        <Candle index={1} left="4.5rem" isBlown={candlesBlown[1]} onBlow={onBlowCandle} />
        <Candle index={2} left="7rem" isBlown={candlesBlown[2]} onBlow={onBlowCandle} />
        <Candle index={3} left="9.5rem" isBlown={candlesBlown[3]} onBlow={onBlowCandle} />
        <Candle index={4} left="12rem" isBlown={candlesBlown[4]} onBlow={onBlowCandle} />
      </div>
    </div>
  );
}; 