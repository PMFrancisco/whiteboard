import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 flex-1 h-full">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Whiteboard</h1>
        <p className="text-xl mb-8 text-gray-600">
          A simple and powerful whiteboard application to express your ideas.
        </p>
        
        <Link 
          href="/whiteboard" 
          className="inline-block px-6 py-3 rounded-lg text-white font-medium bg-blue-600 shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:scale-105"
        >
          Open Whiteboard
        </Link>
      </div>
    </div>
  );
}
