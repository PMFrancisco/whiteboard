import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Pencil, Save, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 h-full">
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-gray-800 tracking-tight">
          Create with <span className="text-blue-600">Whiteboard</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          A powerful digital whiteboard application that lets you express your ideas and bring your projects to life.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/whiteboard">
            <Button size="lg" className="gap-2">
              Get Started
              <ChevronRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-16">
        <Card className="p-6">
          <div className="mb-4 p-3 bg-blue-100 rounded-lg w-fit">
            <Pencil className="size-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Intuitive Drawing</h3>
          <p className="text-gray-600">
            Easy-to-use drawing tools powered by tldraw. Create, edit, and customize shapes with complete freedom.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4 p-3 bg-purple-100 rounded-lg w-fit">
            <Save className="size-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Auto-Save</h3>
          <p className="text-gray-600">
            Your changes are saved automatically. Never lose your work thanks to our persistence system.
          </p>
        </Card>

        <Card className="p-6">
          <div className="mb-4 p-3 bg-amber-100 rounded-lg w-fit">
            <Sparkles className="size-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
          <p className="text-gray-600">
            Generate images and enhance your drawings with our AI-powered assistant. Transform your ideas into reality.
          </p>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to Start?
        </h2>
        <p className="text-gray-600 mb-8">
          Create your first whiteboard and start bringing your ideas to life.
        </p>
        <Link href="/whiteboard">
          <Button variant="outline" size="lg" className="gap-2">
            Create my first board
            <ChevronRight className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
