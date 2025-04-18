'use client';

import { ReactNode } from 'react';
import { withTRPC } from '@/utils/trpc';

function WhiteboardLayout({ children }: { children: ReactNode }) {
  return children;
}

// Apply withTRPC to the layout to make it available throughout the whiteboard page
export default withTRPC(WhiteboardLayout); 