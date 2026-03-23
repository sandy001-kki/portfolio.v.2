import type { Metadata } from 'next';
import './globals.css';
import PageViewTracker from '@/components/PageViewTracker';

export const metadata: Metadata = {
  title: 'Sandeep Kumar Bollavaram — AI, Robotics & Web Dev',
  description:
    'Personal portfolio of Sandeep Kumar Bollavaram — B.Tech CSE student building AI systems, autonomous robots, and full-stack web apps.',
  keywords: [
    'Sandeep Kumar Bollavaram',
    'AI Engineer',
    'Computer Vision',
    'Robotics',
    'Next.js',
    'Python',
    'SCSVMV University',
    'Flexdee Technologies',
    'Startup Founder',
  ],
  metadataBase: new URL('https://sandeepkumarbollavaram.in'),
  openGraph: {
    title: 'Sandeep Kumar Bollavaram',
    description: 'AI • Robotics • Full-Stack Web Development • Startup Founder',
    type: 'website',
    url: 'https://sandeepkumarbollavaram.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Kumar Bollavaram',
    description: 'AI • Robotics • Full-Stack Web Development • Startup Founder',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
