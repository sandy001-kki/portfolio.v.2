// Grouped skills — no percentages, no bars. Clean recruiter-scannable
// tag groups aligned to the AI Systems / Platform / Full Stack positioning.

export interface SkillGroup {
  category: string;
  color: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming',
    color: '#6366F1',
    skills: ['Go', 'Python', 'TypeScript', 'C#', 'JavaScript', 'Dart', 'SQL', 'C++', 'R'],
  },
  {
    category: 'Platform Engineering',
    color: '#0891B2',
    skills: ['Kubernetes', 'Kubebuilder', 'controller-runtime', 'CRDs', 'Webhooks', 'Helm', 'gRPC', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    category: 'AI & LLM',
    color: '#7C3AED',
    skills: ['MCP', 'AI Agents', 'RAG', 'Ollama', 'LangChain', 'Embeddings', 'Vector Retrieval', 'Whisper', 'Local AI'],
  },
  {
    category: 'Backend',
    color: '#0D9488',
    skills: ['FastAPI', 'Node.js', 'PostgreSQL', 'Firebase', 'REST', 'gRPC', 'SQLite'],
  },
  {
    category: 'Frontend',
    color: '#0284C7',
    skills: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Three.js'],
  },
  {
    category: 'Desktop',
    color: '#D97706',
    skills: ['WinUI 3', '.NET', 'PyQt6', 'Windows Release Pipeline', 'Local AI'],
  },
  {
    category: 'Robotics & IoT',
    color: '#059669',
    skills: ['Raspberry Pi', 'ESP32', 'Arduino', 'LiDAR', 'SLAM', 'Flutter'],
  },
];

// Quick Snapshot — recruiter 5-second scan groups.
export const SNAPSHOT = [
  { label: 'Platform Engineering', detail: 'Go, Kubernetes, Operators, Helm, gRPC', color: '#0891B2' },
  { label: 'AI Systems', detail: 'MCP, RAG, AI Agents, Ollama, Vector Memory', color: '#7C3AED' },
  { label: 'Full Stack', detail: 'Next.js, Flutter, FastAPI, PostgreSQL', color: '#0284C7' },
  { label: 'Desktop Applications', detail: 'WinUI 3, .NET, Local AI', color: '#D97706' },
  { label: 'Open Source', detail: 'Multiple public projects and releases', color: '#6366F1' },
];

// Flat technology cloud, grouped-ready ordering for the Skills section footer.
export const TECH_STACK = [
  'Go', 'Python', 'TypeScript', 'C#', 'C++', 'Dart', 'SQL', 'R',
  'Kubernetes', 'Kubebuilder', 'Helm', 'gRPC', 'Docker', 'GitHub Actions',
  'MCP', 'RAG', 'Ollama', 'LangChain', 'Embeddings', 'Whisper',
  'FastAPI', 'Node.js', 'PostgreSQL', 'Firebase',
  'Next.js', 'React', 'Tailwind CSS', 'Three.js',
  'WinUI 3', '.NET', 'PyQt6',
  'Raspberry Pi', 'ESP32', 'LiDAR', 'SLAM', 'Flutter',
];
