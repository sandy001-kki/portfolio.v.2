export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export interface SkillGroup {
  category: string;
  color: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI / ML',
    color: '#22C55E',
    skills: [
      { name: 'Python', level: 92, icon: 'python' },
      { name: 'OpenCV', level: 85, icon: 'opencv' },
      { name: 'YOLOv8', level: 80, icon: 'yolo' },
      { name: 'MediaPipe', level: 78, icon: 'mediapipe' },
      { name: 'TensorFlow.js', level: 70, icon: 'tensorflow' },
    ],
  },
  {
    category: 'Web Dev',
    color: '#3B82F6',
    skills: [
      { name: 'Next.js', level: 88, icon: 'nextjs' },
      { name: 'TypeScript', level: 85, icon: 'typescript' },
      { name: 'React', level: 87, icon: 'react' },
      { name: 'Tailwind CSS', level: 90, icon: 'tailwind' },
      { name: 'Firebase', level: 82, icon: 'firebase' },
      { name: 'Node.js', level: 75, icon: 'nodejs' },
    ],
  },
  {
    category: 'Robotics',
    color: '#F59E0B',
    skills: [
      { name: 'Raspberry Pi', level: 80, icon: 'raspberrypi' },
      { name: 'Arduino', level: 78, icon: 'arduino' },
      { name: 'ESP32', level: 75, icon: 'esp32' },
      { name: 'Flutter / Dart', level: 72, icon: 'flutter' },
      { name: 'C++', level: 75, icon: 'cpp' },
    ],
  },
  {
    category: 'Data Science',
    color: '#8B5CF6',
    skills: [
      { name: 'R / Shiny', level: 72, icon: 'r' },
      { name: 'Random Forest', level: 68, icon: 'ml' },
      { name: 'ARIMA', level: 65, icon: 'timeseries' },
      { name: 'ggplot2', level: 70, icon: 'ggplot' },
      { name: 'Jupyter', level: 80, icon: 'jupyter' },
    ],
  },
];

export const TECH_STACK = [
  'Python', 'TypeScript', 'JavaScript', 'C++', 'R', 'Dart',
  'Next.js', 'React', 'Node.js', 'Flutter',
  'OpenCV', 'YOLOv8', 'MediaPipe', 'TensorFlow.js',
  'Firebase', 'Supabase', 'PostgreSQL',
  'Raspberry Pi', 'Arduino', 'ESP32',
  'Tailwind CSS', 'Three.js', 'WebGL',
  'Git', 'Docker', 'Kubernetes (K8s)', 'Linux',
];
