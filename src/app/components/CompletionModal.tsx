interface CompletionModalProps {
  puzzleName: string;
  onPlayAgain: () => void;
}

export const CompletionModal = ({ puzzleName, onPlayAgain }: CompletionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-yellow-300 to-orange-400 p-6 rounded-2xl text-center shadow-2xl mx-4">
        <h2 className="text-2xl font-bold text-white mb-3">🎉 Amazing Job, Sid! 🎉</h2>
        <p className="text-lg text-white mb-4">You completed the {puzzleName.toLowerCase()} puzzle!</p>
        <button
          onClick={onPlayAgain}
          className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold hover:bg-orange-100 transition-colors"
        >
          Play Again! 🧩
        </button>
      </div>
    </div>
  );
}; 