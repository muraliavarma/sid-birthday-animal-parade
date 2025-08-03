import { FloatingAnimals } from './FloatingAnimals';
import { TwinklingStars } from './TwinklingStars';
import { Balloon } from './Balloon';
import { BirthdayCake } from './BirthdayCake';
import { StartGameButton } from './StartGameButton';
import { ConfettiComponent } from './Confetti';
import { Dimensions } from '../types';

interface HomeScreenProps {
  dimensions: Dimensions;
  confettiActive: boolean;
  candlesBlown: boolean[];
  balloonsPopped: boolean[];
  onStartGame: () => void;
  onBlowCandle: (index: number) => void;
  onPopBalloon: (index: number) => void;
}

export const HomeScreen = ({
  dimensions,
  confettiActive,
  candlesBlown,
  balloonsPopped,
  onStartGame,
  onBlowCandle,
  onPopBalloon,
}: HomeScreenProps) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-pink-400 via-fuchsia-500 to-blue-400 overflow-hidden flex items-center justify-center relative">
      {/* Confetti */}
      <ConfettiComponent dimensions={dimensions} isActive={confettiActive} />

      {/* Floating Animals */}
      <FloatingAnimals size="large" />

      {/* Interactive Balloons */}
      <Balloon index={0} className="absolute top-10 left-10 text-8xl animate-bounce" isPopped={balloonsPopped[0]} onPop={onPopBalloon} />
      <Balloon index={1} className="absolute top-20 right-20 text-7xl animate-bounce animation-delay-500" isPopped={balloonsPopped[1]} onPop={onPopBalloon} />
      <Balloon index={2} className="absolute bottom-20 left-20 text-6xl animate-bounce animation-delay-1000" isPopped={balloonsPopped[2]} onPop={onPopBalloon} />
      <Balloon index={3} className="absolute bottom-10 right-10 text-7xl animate-bounce animation-delay-1500" isPopped={balloonsPopped[3]} onPop={onPopBalloon} />

      {/* Twinkling Stars */}
      <TwinklingStars />

      <div className="text-center z-10">
        {/* Giant Birthday Cake */}
        <BirthdayCake candlesBlown={candlesBlown} onBlowCandle={onBlowCandle} />

        {/* Giant Birthday Text */}
        <h1 className="text-6xl sm:text-7xl font-extrabold mb-6 drop-shadow-2xl animate-bounce bg-gradient-to-r from-yellow-200 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          🎉 SID! 🎉
        </h1>

        {/* Super Fun Button */}
        <StartGameButton onClick={onStartGame} />

        {/* Birthday Message */}
        <div className="mt-10">
          <p className="text-4xl text-white font-extrabold drop-shadow-lg animate-pulse">
            🎂 Happy 5th Birthday, Sid! 🎂
          </p>
          <p className="text-2xl text-white/90 mt-4 font-semibold">
            🎁 Click the candles &amp; balloons for surprises! 🎁
          </p>
        </div>

        {/* Fun Emojis */}
        <div className="mt-10 text-7xl animate-bounce space-x-2">
          🦄 🦕 🚀 🎪 🎨 🐼 🐯
        </div>
      </div>
    </div>
  );
}; 