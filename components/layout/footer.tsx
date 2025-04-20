import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full p-6 border-t text-sm mt-autotext-gray-600">
          <p>© {new Date().getFullYear()} Whiteboard. Technical Test by <Link href="https://github.com/PMFrancisco" target="_blank" rel="noopener noreferrer">@PMFrancisco.</Link></p>        
    </footer>
  );
}
