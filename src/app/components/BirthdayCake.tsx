import { Candle } from './Candle';

interface BirthdayCakeProps {
  candlesBlown: boolean[];
  onBlowCandle: (index: number) => void;
}

export const BirthdayCake = ({ candlesBlown, onBlowCandle }: BirthdayCakeProps) => {
  return (
    <div className="mb-4 relative">
      <div className="w-48 h-36 sm:w-64 sm:h-48 bg-gradient-to-b from-pink-400 to-purple-500 rounded-t-full shadow-2xl relative">
        {/* Cake Layers */}
        <div className="absolute bottom-0 w-full h-12 sm:h-16 bg-gradient-to-b from-blue-400 to-purple-500 rounded-t-full"></div>
        <div className="absolute bottom-12 sm:bottom-16 w-full h-12 sm:h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full"></div>

        {/* 5 Candles */}
        <Candle index={0} left="left-6 sm:left-8" isBlown={candlesBlown[0]} onBlow={onBlowCandle} />
        <Candle index={1} left="left-14 sm:left-18" isBlown={candlesBlown[1]} onBlow={onBlowCandle} />
        <Candle index={2} left="left-22 sm:left-28" isBlown={candlesBlown[2]} onBlow={onBlowCandle} />
        <Candle index={3} left="left-30 sm:left-38" isBlown={candlesBlown[3]} onBlow={onBlowCandle} />
        <Candle index={4} left="left-38 sm:left-48" isBlown={candlesBlown[4]} onBlow={onBlowCandle} />
      </div>
    </div>
  );
}; 