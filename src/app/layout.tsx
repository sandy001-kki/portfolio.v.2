import type { Metadata } from 'next';
import './globals.css';
import PageViewTracker from '@/components/PageViewTracker';

const SITE_URL = 'https://www.sandeepkumarbollavaram.in';
const OG_IMAGE = '/images/profile.jpg';
const DESCRIPTION =
  'AI Systems Engineer building Kubernetes operators, AI agent infrastructure, local LLM systems, developer tools, desktop software, cloud platforms, and robotics applications.';

export const metadata: Metadata = {
  title: 'Sandeep Kumar Bollavaram | AI Systems Engineer',
  description: DESCRIPTION,
  keywords: [
    'Sandeep Kumar Bollavaram',
    'AI Systems Engineer',
    'LLM Engineer',
    'Platform Engineer',
    'Kubernetes Operator',
    'MCP',
    'AI Agents',
    'Go',
    'Open Source',
    'Full Stack Engineer',
  ],
  authors: [{ name: 'Sandeep Kumar Bollavaram', url: SITE_URL }],
  creator: 'Sandeep Kumar Bollavaram',
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sandeep Kumar Bollavaram | AI Systems Engineer',
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: 'Sandeep Kumar Bollavaram',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Sandeep Kumar Bollavaram — AI Systems Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandeep Kumar Bollavaram | AI Systems Engineer',
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sandeep Kumar Bollavaram',
  url: SITE_URL,
  jobTitle: 'AI Systems Engineer · LLM Engineer · Platform Engineer',
  description: DESCRIPTION,
  sameAs: [
    'https://github.com/sandeepbollavaram',
    'https://www.linkedin.com/in/sandeepbollavaram',
  ],
  knowsAbout: [
    'Kubernetes Operators',
    'AI Agent Infrastructure',
    'Large Language Models',
    'Platform Engineering',
    'Full Stack Engineering',
    'Robotics',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        <PageViewTracker />
        {children}
      </body>
    </html>
  );
}
