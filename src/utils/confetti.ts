// Dynamic import to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let confetti: ((options: any) => void) | null = null;

if (typeof window !== 'undefined') {
  import('canvas-confetti').then(module => {
    confetti = module.default;
  });
}

export const triggerConfetti = (type: 'milestone' | 'achievement' | 'rainbow' | 'fireworks' = 'milestone') => {
  if (!confetti) return;
  
  switch (type) {
    case 'milestone':
      // Basic milestone confetti - colorful and exciting
      confetti!({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });
      break;

    case 'achievement':
      // Special achievement confetti - gold and sparkly
      confetti!({
        particleCount: 150,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00CED1'],
        shapes: ['star', 'circle'],
        scalar: 1.2
      });
      break;

    case 'rainbow':
      // Rainbow burst effect
      const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
      confetti!({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.5 },
        colors,
        ticks: 300,
        gravity: 0.8,
        scalar: 1.5
      });
      break;

    case 'fireworks':
      // Fireworks effect - multiple bursts
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Multiple bursts from different positions
        confetti!({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti!({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
      break;
  }
};

export const triggerContinuousConfetti = (duration: number = 3000) => {
  if (!confetti) return;
  
  const end = Date.now() + duration;

  const frame = () => {
    confetti!({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    });
    confetti!({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

export const triggerMilestoneConfetti = (count: number) => {
  if (count % 50 === 0) {
    // Super special milestone - fireworks!
    triggerConfetti('fireworks');
  } else if (count % 25 === 0) {
    // Special milestone - rainbow burst
    triggerConfetti('rainbow');
  } else if (count % 10 === 0) {
    // Regular milestone - achievement confetti
    triggerConfetti('achievement');
  } else if (count % 5 === 0) {
    // Small milestone - basic confetti
    triggerConfetti('milestone');
  }
};