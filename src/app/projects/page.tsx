import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects — Sandeep Kumar Bollavaram | AI Systems Engineer',
  description:
    'Full project catalog: Kubernetes operators, AI agent infrastructure, local LLM systems, desktop applications, cloud security platforms, and robotics — with live GitHub data.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
