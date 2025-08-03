import { Candle } from './Candle';

interface BirthdayCakeProps {
  candlesBlown: boolean[];
  onBlowCandle: (index: number) => void;
}

export const BirthdayCake = ({ candlesBlown, onBlowCandle }: BirthdayCakeProps) => {
  return (
    <div className="mb-4 relative">
      {/* Cake Base Container */}
      <div className="w-48 h-32 sm:w-64 sm:h-40 relative">
        
        {/* Single Chocolate Cake Layer */}
        <div className="absolute bottom-0 w-full h-24 sm:h-28 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-600 rounded-t-3xl shadow-2xl border-2 border-amber-900">
          {/* Cake texture */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-700/50 to-amber-600/50 rounded-t-3xl"></div>
          
          {/* Sprinkles - evenly distributed across the cake */}
          <div className="absolute top-3 left-[10%] w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute top-5 left-[20%] w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-100"></div>
          <div className="absolute top-7 left-[30%] w-1 h-1 bg-green-400 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-4 left-[40%] w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-6 left-[50%] w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
          <div className="absolute top-8 left-[60%] w-1 h-1 bg-red-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-5 left-[70%] w-1 h-1 bg-orange-400 rounded-full animate-pulse delay-600"></div>
          <div className="absolute top-9 left-[80%] w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-11 left-[90%] w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-800"></div>
          <div className="absolute top-10 left-[15%] w-1 h-1 bg-green-300 rounded-full animate-pulse delay-900"></div>
          <div className="absolute top-12 left-[25%] w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-6 left-[35%] w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-1100"></div>
          <div className="absolute top-8 left-[45%] w-1 h-1 bg-red-300 rounded-full animate-pulse delay-1200"></div>
          <div className="absolute top-4 left-[55%] w-1 h-1 bg-orange-300 rounded-full animate-pulse delay-1300"></div>
          <div className="absolute top-10 left-[65%] w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1400"></div>
          <div className="absolute top-7 left-[75%] w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1500"></div>
          <div className="absolute top-9 left-[85%] w-1 h-1 bg-green-400 rounded-full animate-pulse delay-1600"></div>
          <div className="absolute top-5 left-[95%] w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1700"></div>
          <div className="absolute top-11 left-[5%] w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1800"></div>
          <div className="absolute top-6 left-[85%] w-1 h-1 bg-red-400 rounded-full animate-pulse delay-1900"></div>
        </div>

        {/* 5 Candles */}
        <Candle index={0} left="left-6 sm:left-8" isBlown={candlesBlown[0]} onBlow={onBlowCandle} />
        <Candle index={1} left="left-14 sm:left-18" isBlown={candlesBlown[1]} onBlow={onBlowCandle} />
        <Candle index={2} left="left-22 sm:left-28" isBlown={candlesBlown[2]} onBlow={onBlowCandle} />
        <Candle index={3} left="left-30 sm:left-38" isBlown={candlesBlown[3]} onBlow={onBlowCandle} />
        <Candle index={4} left="left-38 sm:left-48" isBlown={candlesBlown[4]} onBlow={onBlowCandle} />

        {/* Cake Plate/Stand */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-52 sm:w-68 h-3 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full shadow-lg border border-gray-400"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-56 sm:w-72 h-2 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full shadow-md"></div>
      </div>
    </div>
  );
}; 