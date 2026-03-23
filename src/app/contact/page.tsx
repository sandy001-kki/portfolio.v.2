import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact — Sandeep Kumar Bollavaram',
  description: 'Get in touch with Sandeep Kumar Bollavaram for collaborations, projects, or inquiries.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
