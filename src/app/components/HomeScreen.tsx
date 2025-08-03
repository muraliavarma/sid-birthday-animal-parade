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
    <div className="w-screen h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-purple-600 overflow-hidden flex items-center justify-center relative">
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

      <div className="text-center z-10 flex flex-col items-center justify-center">
        {/* Giant Birthday Cake */}
        <div className="flex justify-center mb-4">
          <BirthdayCake candlesBlown={candlesBlown} onBlowCandle={onBlowCandle} />
        </div>

        {/* Birthday Text with better contrast */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold drop-shadow-2xl animate-bounce">
            🎉 <span className="bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-100 bg-clip-text text-transparent">Happy Birthday Sid! </span> 🎉
          </h1>
        </div>

        {/* Super Fun Button */}
        <StartGameButton onClick={onStartGame} />

      </div>
    </div>
  );
}; 