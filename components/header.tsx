import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Whiteboard</Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/test-trpc" className="hover:text-gray-600 transition-colors">
            Test
          </Link>
          <Link href="/test-trpc/save" className="hover:text-gray-600 transition-colors">
            Save
          </Link>
        </nav>
      </div>
    </header>
  );
} 