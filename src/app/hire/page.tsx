import type { Metadata } from 'next';
import HirePageClient from './HirePageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hire Me — Sandeep Kumar Bollavaram',
  description: 'Work with Sandeep Kumar Bollavaram on AI, robotics, or web development projects.',
};

export default function HirePage() {
  return <HirePageClient />;
}
