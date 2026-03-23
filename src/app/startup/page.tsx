import Flexdee from '@/components/Flexdee';
import StartupTopBar from './StartupTopBar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flexdee Technologies — Sandeep Kumar Bollavaram',
  description: 'Flexdee Technologies — an all-in-one platform for software services, programming education, hardware freelancing, dev tools, and research. Founded by Sandeep Kumar Bollavaram.',
};

export default function StartupPage() {
  return (
    <main style={{ background: '#030712', minHeight: '100vh' }}>
      <StartupTopBar />
      <Flexdee />
    </main>
  );
}
