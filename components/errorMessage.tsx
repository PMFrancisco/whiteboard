"use client";

import { useState } from "react";

export default function ErrorMessage({ message }: { message: string }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
      {message}
      <button
        className="ml-2 text-red-900 font-bold"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </button>
    </div>
  );
}