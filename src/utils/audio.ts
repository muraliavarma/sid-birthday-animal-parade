// Create animal-like sounds using Web Audio API
const createAnimalSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
  // Create a simple tone that sounds like an animal
  const audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

// Animal sound configurations
const animalSoundConfigs = {
  'roar': { frequency: 120, duration: 0.8, type: 'square' as const }, // Deep lion roar
  'trumpet': { frequency: 200, duration: 1.2, type: 'sine' as const }, // Elephant trumpet
  'munch': { frequency: 300, duration: 0.4, type: 'sine' as const }, // Giraffe munch
  'ooh ooh': { frequency: 400, duration: 0.6, type: 'sine' as const }, // Monkey sound
  'waddle': { frequency: 250, duration: 0.5, type: 'triangle' as const }, // Penguin waddle
  'rawr': { frequency: 150, duration: 1.0, type: 'square' as const }, // Dinosaur roar
};

export const playAnimalSound = (soundName: string) => {
  const config = animalSoundConfigs[soundName as keyof typeof animalSoundConfigs];
  if (config) {
    try {
      createAnimalSound(config.frequency, config.duration, config.type);
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  }
};

export const stopAllSounds = () => {
  // Audio stops automatically when duration ends
}; 