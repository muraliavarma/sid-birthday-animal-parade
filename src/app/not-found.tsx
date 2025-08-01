import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center">
      <div className="text-center bg-white bg-opacity-90 rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-4">🎈 Oops! 🎈</h1>
        <p className="text-xl mb-4">This page doesn&apos;t exist</p>
        <Link 
          href="/" 
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Birthday Game! 🎉
        </Link>
      </div>
    </div>
  );
} 