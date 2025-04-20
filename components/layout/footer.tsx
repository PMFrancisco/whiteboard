import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full p-6 bg-white/70 backdrop-blur-sm border-t border-gray-200/50 text-sm text-gray-600">
      <p>© {new Date().getFullYear()} Whiteboard. Technical Test by <Link href="https://github.com/PMFrancisco" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">@PMFrancisco.</Link></p>        
    </footer>
  );
}
