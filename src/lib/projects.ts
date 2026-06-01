// ─────────────────────────────────────────────────────────────
// CURATED PROJECT DATA
//
// This file holds the *curated* projects: the ones with custom
// descriptions, impact lines, categories, status, and ordering.
// Auto-discovered public repos from github.com/sandeepbollavaram are
// merged in at runtime by lib/github.ts (see mergeRepos). Curated
// entries with a matching `repo` slug act as manual metadata overrides.
//
// GITHUB: primary account = github.com/sandeepbollavaram.
// Never use github.com/sandy001-kki. Academic repos stay under
// github.com/11249a040-sandeep (profile: 'university').
//
// PRIVATE projects expose NO GitHub link — `private: true` renders a
// "Private Repository / Internal Project" badge instead.
// ─────────────────────────────────────────────────────────────

export type Category =
  | 'All'
  | 'Featured Engineering'
  | 'AI & LLM Systems'
  | 'Platform & Infrastructure'
  | 'Desktop Applications'
  | 'Cloud & Security'
  | 'Robotics & IoT'
  | 'Full Stack'
  | 'Archive / Labs';

export type Status =
  | 'Open Source'
  | 'Released'
  | 'Deployed'
  | 'In Progress'
  | 'Private Repository'
  | 'Internal Project'
  | 'Production System';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc: string;
  impact?: string; // one-line recruiter-facing impact statement
  features?: string[];
  category: Category;
  status: Status;
  tags: string[];
  /** Public repo slug under github.com/sandeepbollavaram (used to merge live data + dedupe). */
  repo?: string;
  /** Full GitHub URL. Omit for private/internal projects. */
  github?: string;
  /** Academic/university repos live on a different account. */
  university?: boolean;
  /** Private/internal — never render a GitHub link. */
  private?: boolean;
  demo?: string;
  /** Show on the homepage Featured grid (max 6, in array order). */
  featuredHome?: boolean;
  /** Homepage display order when featuredHome is true. */
  order?: number;
  year: number;
  /** Live stats hydrated from the GitHub API at runtime. */
  stars?: number;
  language?: string;
  updatedAt?: string;
}

export const GITHUB_USER = 'sandeepbollavaram';
export const GITHUB_PRIMARY = `https://github.com/${GITHUB_USER}`;
export const GITHUB_ACADEMIC = 'https://github.com/11249a040-sandeep';

// Repos that must never surface a public link, even if the API ever returns them.
export const PRIVATE_REPOS = [
  'Flexdee-Technologies',
  'aionos',
  'FlexDeeGamesHub',
  'flexdee-games',
  'portfolio',
];

export const PROJECTS: Project[] = [
  // ───────────── HOMEPAGE FEATURED (exactly 6, in order) ─────────────
  {
    id: 'shukra',
    title: 'Shukra Operator',
    description:
      'Production-grade Kubernetes operator: one AppEnvironment CRD provisions an entire full-stack app environment.',
    longDesc:
      'Shukra is a production-grade Kubernetes platform operator built in Go with Kubebuilder and controller-runtime. A single AppEnvironment custom resource provisions an entire application stack — Deployments, Services, ConfigMaps, Ingress, HPA, Jobs, and security resources — through idempotent reconciliation. Built with finalizers, status conditions, leader election, admission webhooks, and structured logging for enterprise reliability. Ships via Helm OCI charts and exposes a gRPC control surface, with an AI-assisted CLI (`shukra ask`) for conversational workflow guidance. Treats namespaces as first-class security tenancy boundaries. Supports kind, k3d, Minikube, EKS, GKE, and AKS.',
    impact:
      'Collapses an entire app environment into one declarative CRD — replacing dozens of hand-written manifests.',
    features: [
      'Single AppEnvironment CRD provisions the full stack (Deployments, Services, Ingress, HPA)',
      'Production-grade: finalizers, leader election, idempotent reconciliation, admission webhooks',
      'Helm OCI distribution + gRPC control surface',
      'AI-assisted CLI — `shukra ask` for conversational workflow guidance',
      'Namespace tenancy as security boundaries — multi-tenant safe',
      'Multi-cluster: kind, k3d, Minikube, EKS, GKE, AKS · CI via GitHub Actions',
    ],
    category: 'Featured Engineering',
    status: 'Open Source',
    tags: ['Go', 'Kubernetes', 'Kubebuilder', 'controller-runtime', 'CRDs', 'Webhooks', 'Helm OCI', 'gRPC', 'GitHub Actions'],
    repo: 'Shukra',
    github: 'https://github.com/sandeepbollavaram/Shukra',
    featuredHome: true,
    order: 1,
    year: 2026,
  },
  {
    id: 'kairo',
    title: 'Kairo',
    description:
      'Persistent engineering memory and session-continuity platform for AI coding agents — MCP-based, local-first.',
    longDesc:
      'Kairo gives AI coding agents long-term, project-scoped memory and session continuity. Built on the Model Context Protocol (MCP) and running local-first, it maintains a vector memory of engineering decisions, indexes repository intelligence, and supports checkpoint recovery so an agent can resume exactly where it left off across sessions. Embeddings power semantic retrieval over past work, decisions, and code context — turning a stateless assistant into one with durable, queryable engineering memory.',
    impact:
      'Gives stateless AI coding agents durable, project-scoped memory and resumable sessions.',
    features: [
      'MCP server — plugs into any MCP-compatible AI coding agent',
      'Local-first vector memory with embeddings + semantic retrieval',
      'Checkpoint recovery — resume sessions with full context intact',
      'Repository intelligence: indexes code, decisions, and engineering history',
    ],
    category: 'AI & LLM Systems',
    status: 'In Progress',
    tags: ['MCP', 'Python', 'Embeddings', 'Vector Retrieval', 'AI Agents', 'Local AI', 'RAG'],
    repo: 'Kairo',
    github: 'https://github.com/sandeepbollavaram/Kairo',
    featuredHome: true,
    order: 2,
    year: 2026,
  },
  {
    id: 'vayu',
    title: 'Vayu',
    description:
      'Offline-first Windows AI desktop assistant — WinUI 3, .NET, Ollama, voice, and permission-aware automation.',
    longDesc:
      'Vayu is an offline-first AI desktop assistant for Windows, built with WinUI 3 and .NET. It runs local LLMs through Ollama so inference stays on-device with no cloud dependency. A voice architecture handles speech in and out, and a permission-aware automation layer lets the assistant take actions on the system under explicit, scoped user consent — combining a native Windows experience with private, local AI.',
    impact:
      'A private, offline LLM assistant native to Windows — no cloud, no data leaving the device.',
    features: [
      'Offline-first: local LLM inference via Ollama, no cloud dependency',
      'Native WinUI 3 + .NET desktop experience',
      'Voice architecture for speech input and output',
      'Permission-aware automation — scoped, consent-gated system actions',
    ],
    category: 'Desktop Applications',
    status: 'In Progress',
    tags: ['WinUI 3', '.NET', 'C#', 'Ollama', 'Local AI', 'Whisper', 'Voice'],
    repo: 'Vayu',
    github: 'https://github.com/sandeepbollavaram/Vayu',
    featuredHome: true,
    order: 3,
    year: 2026,
  },
  {
    id: 'university-erp',
    title: 'University ERP Ecosystem',
    description:
      'Production university management platform: role-based web portal + Flutter student app with QR attendance.',
    longDesc:
      'An integrated university management ecosystem combining a role-based web portal with a Flutter student attendance app. Covers QR-based attendance, marks, timetable, leave workflows, and parent alerts, with role separation across students, faculty, and admins. Deployed on Firebase. The web portal and the mobile app share a single backend, giving each role the right surface for attendance, academic records, and approvals.',
    impact:
      'A single platform covering attendance, marks, timetable, and approvals across web + mobile for a whole university.',
    features: [
      'Role-based web portal: students, faculty, admin',
      'Flutter student app with QR-based attendance',
      'Marks, timetable, leave workflows, and parent alerts',
      'Firebase deployment with a shared backend across web + mobile',
    ],
    category: 'Full Stack',
    status: 'Production System',
    tags: ['Next.js', 'TypeScript', 'Flutter', 'Dart', 'Firebase', 'PostgreSQL'],
    private: true, // production system — no public repo link
    featuredHome: true,
    order: 4,
    year: 2026,
  },
  {
    id: 'oci-sentinelmesh',
    title: 'OCI SentinelMesh',
    description:
      'Cloud security and compliance monitoring platform — FastAPI, React dashboard, compliance rule engine.',
    longDesc:
      'OCI SentinelMesh is a cloud security and compliance monitoring platform. A FastAPI backend runs a configurable compliance rule engine against cloud resources and persists findings to SQLite; a React dashboard surfaces posture, violations, and trends. The full stack ships via Docker Compose with CI, making it straightforward to stand up continuous compliance monitoring in any environment.',
    impact:
      'Continuous, rule-driven cloud compliance monitoring with a live posture dashboard — one Docker command to deploy.',
    features: [
      'FastAPI backend with a configurable compliance rule engine',
      'React dashboard for posture, violations, and trends',
      'SQLite persistence for findings and history',
      'Docker Compose deployment with CI',
    ],
    category: 'Cloud & Security',
    status: 'Open Source',
    tags: ['FastAPI', 'Python', 'React', 'SQLite', 'Docker', 'CI/CD', 'Cloud Security'],
    repo: 'oci-sentinelmesh',
    github: 'https://github.com/sandeepbollavaram/oci-sentinelmesh',
    featuredHome: true,
    order: 5,
    year: 2026,
  },
  {
    id: 'vibrance',
    title: 'Vibrance',
    description:
      'Desktop photo editor — image enhancement, compression, batch workflows, and a Windows release pipeline.',
    longDesc:
      'Vibrance is a desktop photo editor focused on fast, repeatable image work: enhancement, compression, and batch workflows across folders of images. It ships through a proper Windows release pipeline, producing a distributable installer so the tool is usable as a real desktop application rather than a script.',
    impact:
      'A shippable desktop photo editor with batch workflows and a real Windows release pipeline.',
    features: [
      'Image enhancement and compression',
      'Batch workflows across folders of images',
      'Windows release pipeline producing a distributable installer',
    ],
    category: 'Desktop Applications',
    status: 'Released',
    tags: ['Python', 'PyQt6', 'OpenCV', 'NumPy', 'Windows'],
    repo: 'vibrance',
    github: 'https://github.com/sandeepbollavaram/vibrance',
    featuredHome: true,
    order: 6,
    year: 2026,
  },

  // ───────────── PROJECTS-PAGE ONLY (not on homepage) ─────────────
  {
    id: 'weapon-detection',
    title: 'Weapon Detection Platform',
    description:
      'Real-time YOLOv8 / OpenCV security CV system with alerts, video recording, and a live dashboard.',
    longDesc:
      'A real-time computer-vision security platform that detects weapons in live video feeds at ~30fps using YOLOv8 and OpenCV. The pipeline runs night-mode enhancement → face identification → person detection → weapon classification. On a confirmed threat it auto-captures snapshots, records video segments, and fires multi-channel alerts (email, SMS, Telegram, local alarm). All detections are logged to a searchable SQLite database surfaced in a live web dashboard, with multi-camera support and a configurable confidence threshold.',
    impact:
      'Detects pistols, knives, rifles, and grenades at ~30fps and fires multi-channel alerts in real time.',
    features: [
      'Detects 4 weapon types (pistol, knife, rifle, grenade) at ~30fps',
      'Multi-channel alerts: email, SMS, Telegram, local alarm',
      'Auto-capture snapshots + record video on threat detection',
      'Live web dashboard with searchable SQLite detection log',
    ],
    category: 'AI & LLM Systems',
    status: 'Open Source',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'SQLite', 'Telegram API', 'Computer Vision'],
    repo: 'Security-Cams-Weapon-Detection-',
    github: 'https://github.com/sandeepbollavaram/Security-Cams-Weapon-Detection-',
    year: 2026,
  },
  {
    id: 'agv-raspberry',
    title: 'AGV — Raspberry Pi',
    description:
      'Raspberry Pi + LiDAR autonomous ground vehicle with SLAM, obstacle avoidance, and Flutter remote control.',
    longDesc:
      'A fully functional Autonomous Ground Vehicle using a Raspberry Pi as the central controller and Arduino for sensor/motor control. A YDLIDAR sensor drives 360° mapping and SLAM; a Python WebSocket server handles real-time telemetry and control. A Flutter mobile app provides a live joystick and telemetry view. Three operating modes: manual joystick, autonomous line following, and LiDAR-based obstacle avoidance.',
    impact:
      'A real autonomous vehicle: LiDAR SLAM, obstacle avoidance, and live Flutter remote control over WiFi.',
    features: [
      'Raspberry Pi + Arduino dual-controller architecture',
      'YDLIDAR 360° mapping with SLAM and obstacle avoidance',
      'Three modes: manual joystick, autonomous line follow, obstacle avoidance',
      'Flutter remote-control app with live telemetry',
    ],
    category: 'Robotics & IoT',
    status: 'Open Source',
    tags: ['Python', 'Flutter', 'C++', 'Raspberry Pi', 'LiDAR', 'SLAM'],
    repo: 'agv-raspberry-pi-mega',
    github: 'https://github.com/sandeepbollavaram/agv-raspberry-pi-mega',
    year: 2026,
  },
  {
    id: 'agv-esp32',
    title: 'AGV — ESP32',
    description: 'AGV variant: laptop compute + ESP32 over WiFi, live 360° LiDAR mapping and obstacle avoidance.',
    longDesc:
      'An AGV variant using a Windows laptop for compute and an ESP32 microcontroller over WiFi. A Python WebSocket server runs the control loop; a browser UI and Flutter app both act as controllers; ESP32 firmware is in C++. Live 360° LiDAR mapping, multi-interface control, and autonomous obstacle avoidance over a local network — no Raspberry Pi needed.',
    impact:
      'Runs the full AGV control loop with laptop compute and an ESP32 over WiFi — three control interfaces.',
    features: [
      'ESP32 WiFi control — laptop handles compute',
      'Three control interfaces: Flutter app, browser UI, joystick',
      'WebSocket real-time command protocol',
      'Live 360° LiDAR obstacle map',
    ],
    category: 'Robotics & IoT',
    status: 'Open Source',
    tags: ['Python', 'Flutter', 'ESP32', 'LiDAR', 'WebSocket', 'C++'],
    repo: 'agv-laptop-esp32',
    github: 'https://github.com/sandeepbollavaram/agv-laptop-esp32',
    year: 2026,
  },
  {
    id: 'alos',
    title: 'ALOS',
    description: 'Open-source systems project from the sandeepbollavaram GitHub.',
    longDesc:
      'ALOS — an open-source project on github.com/sandeepbollavaram. Live details (description, language, stars) are pulled from the GitHub API; edit this entry to add a custom write-up.',
    category: 'Platform & Infrastructure',
    status: 'Open Source',
    tags: ['Open Source'],
    repo: 'ALOS',
    github: 'https://github.com/sandeepbollavaram/ALOS',
    year: 2026,
  },
  {
    id: 's5-attendance',
    title: 'AI Attendance System',
    description:
      'In-browser facial-recognition attendance — TensorFlow.js, Firebase, role-based dashboards.',
    longDesc:
      'A production-grade AI attendance system for university environments. Built on Next.js + TypeScript + Firebase, it uses TensorFlow.js and face-api.js for in-browser facial recognition with no server-side ML. Faculty take attendance via webcam in one click; the system matches faces against registered students. Role-based dashboards, digital signature verification, automated Excel export, and Firestore real-time sync.',
    impact:
      'One-click webcam attendance with entirely in-browser facial recognition — no ML server required.',
    features: [
      'TensorFlow.js + face-api.js: real-time facial recognition in-browser',
      'Role-based dashboards: faculty vs admin',
      'One-click attendance — webcam scan matches registered faces',
      'Automated Excel export of attendance records',
    ],
    category: 'AI & LLM Systems',
    status: 'Deployed',
    tags: ['Next.js', 'TypeScript', 'TensorFlow.js', 'face-api.js', 'Firebase'],
    github: 'https://github.com/11249a040-sandeep/S5-attendence',
    university: true,
    year: 2026,
  },
  {
    id: 'sales-ml-dashboard',
    title: 'Sales ML Dashboard',
    description: 'Interactive R Shiny dashboard — Random Forest predicts export sales from inputs.',
    longDesc:
      'An interactive ML dashboard in R + Shiny that predicts total export sales using a Random Forest regression model. Real-time prediction sliders, bulk CSV upload for batch predictions, a feature-importance panel, and ggplot2 visualizations.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['R', 'Shiny', 'Random Forest', 'Machine Learning'],
    github: 'https://github.com/11249a040-sandeep/sales-prediction-ml-dashboard-r',
    university: true,
    year: 2026,
  },

  // ───────────── ARCHIVE / LABS ─────────────
  {
    id: 'socialworld',
    title: 'SocialWorld 3D',
    description: 'A living 3D city where social users become buildings — follower count drives height.',
    longDesc:
      'A 3D city visualization where social users become buildings. Follower count determines building height; engagement drives animations. Built with React + Three.js (WebGL), Node.js + Express, and Supabase PostgreSQL with OAuth 2.0 + JWT. Fly/drive navigation, clickable building profiles, billboard ads.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['React', 'Three.js', 'WebGL', 'Node.js', 'Supabase'],
    repo: 'socialworld',
    github: 'https://github.com/sandeepbollavaram/socialworld' /* TODO: confirm slug if public */,
    year: 2026,
  },
  {
    id: 'air-writing',
    title: 'Air Writing System',
    description: 'Touchless hand-gesture writing using MediaPipe — draw, erase, OCR, save.',
    longDesc:
      'AI hand-gesture recognition for fully touchless writing, color selection, erasing, saving, and modular OCR. Built with OpenCV + MediaPipe hand-landmark detection — works with any standard webcam.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'OCR'],
    repo: 'Air-Writing-System',
    github: 'https://github.com/sandeepbollavaram/Air-Writing-System' /* TODO: confirm slug if public */,
    year: 2025,
  },
  {
    id: 'robotic-car',
    title: 'Roboyic Car (Arduino)',
    description: 'Entry-level Arduino robotic car — the starting point before the AGV projects.',
    longDesc:
      'An Arduino-based robotic car. A beginner hardware project predating the AGV repos — built to learn motor control, sensor integration, and embedded C++ basics.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['Arduino', 'C++', 'Hardware'],
    repo: 'Roboyic-car',
    github: 'https://github.com/sandeepbollavaram/Roboyic-car' /* TODO: confirm slug if public */,
    year: 2024,
  },
  {
    id: 'fitness-pro',
    title: 'Sandy Fitness Pro',
    description: 'PWA merging academic timetable + fitness tracking — zero frameworks.',
    longDesc:
      'A Progressive Web App combining timetable management and fitness tracking, OLED-optimized, built with pure HTML/CSS/JS. Installable on Android and iOS.',
    category: 'Archive / Labs',
    status: 'Released',
    tags: ['JavaScript', 'PWA', 'HTML5', 'CSS3'],
    repo: 'sandy-fitness-pro',
    github: 'https://github.com/sandeepbollavaram/sandy-fitness-pro' /* TODO: confirm slug if public */,
    year: 2025,
  },
  {
    id: 'oops-lab',
    title: 'OOP Lab — C++',
    description: '39 C++ programs: classes, inheritance, operator overloading, templates.',
    longDesc:
      '39 C++ programs from the OOP Laboratory at SCSVMV University: classes, inheritance, operator overloading, virtual/abstract classes, templates, and exception handling.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['C++', 'OOP', 'Templates'],
    github: 'https://github.com/11249a040-sandeep/OOPS-LAB',
    university: true,
    year: 2025,
  },
  {
    id: 'leetcodes',
    title: 'LeetCode Solutions',
    description: 'Personal LeetCode solutions in Python — DS & complexity practice.',
    longDesc: 'A personal LeetCode solutions repository in Python, focused on data structures and time complexity.',
    category: 'Archive / Labs',
    status: 'Open Source',
    tags: ['Python', 'Algorithms', 'DSA'],
    repo: 'leetcodes',
    github: 'https://github.com/sandeepbollavaram/leetcodes' /* TODO: confirm slug if public */,
    year: 2025,
  },
];

// Projects-page filter categories (order matters for the filter bar).
export const CATEGORIES: Category[] = [
  'All',
  'Featured Engineering',
  'AI & LLM Systems',
  'Platform & Infrastructure',
  'Desktop Applications',
  'Cloud & Security',
  'Robotics & IoT',
  'Archive / Labs',
];

/** The exactly-6 homepage featured projects, in order. */
export const FEATURED_HOME = PROJECTS
  .filter((p) => p.featuredHome)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
