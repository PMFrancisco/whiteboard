import Link from 'next/link';

export function Header() {

  return (
    <header className="w-full py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Whiteboard</Link>
        <nav className="flex space-x-4">
          <Link href="/whiteboard" className="hover:text-gray-600 transition-colors py-2">
            All Whiteboards
          </Link>
        </nav>
      </div>
    </header>
  );
} 