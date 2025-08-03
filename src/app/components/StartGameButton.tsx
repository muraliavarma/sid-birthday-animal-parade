interface StartGameButtonProps {
  onClick: () => void;
}

export const StartGameButton = ({ onClick }: StartGameButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 active:from-yellow-400 active:to-pink-600 text-white px-8 py-6 rounded-full shadow-2xl transform active:scale-95 hover:scale-110 transition-all duration-300 animate-bounce border-4 border-yellow-200 hover:border-orange-300 relative overflow-hidden group"
    >
      🎮 LET&apos;S PLAY! 🎮
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      <div className="absolute -top-1 -left-1 w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
    </button>
  );
}; 