import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4">Whiteboard</h3>
            <p className="text-sm text-gray-600">
              A collaborative whiteboard application for teams.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/documentation" className="hover:underline">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:underline">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Whiteboard. Technical Test by @PMFrancisco.</p>
        </div>
      </div>
    </footer>
  );
}
