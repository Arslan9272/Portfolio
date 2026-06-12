export type Project = {
  title: string;
  description: string; // 1-2 sentences
  tech: string[];
  links: { live?: string; github?: string };
  accent?: string; // optional gradient hint for the card art
};

export type ExperienceEntry = {
  period: string; // e.g. "2023 — Present"
  role: string;
  org: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = { label: string; skills: string[] };

export const site = {
  name: "Arslan",
  role: "Full Stack Developer",
  eyebrow: "Full Stack Developer · AI / ML / CV",
  tagline: "I build intelligent products — from pixel to model.",
  about: [
    "I'm a full-stack developer who works across the entire product surface — React, TypeScript, and Next.js on the front, Python (FastAPI, Django) and Node.js on the back. I care about interfaces that feel fast and deliberate, and about the APIs and data models that keep them honest.",
    "Alongside product engineering, I work in AI and machine learning, with a focus on computer vision and deep learning. I've trained and fine-tuned models in PyTorch, built vision pipelines that run outside the notebook, and shipped models behind real APIs where latency and reliability actually matter.",
    "What I enjoy most is the seam between the two: taking a model that works in an experiment and turning it into a product someone can use — clean UI in front, a well-designed service in the middle, and a model that holds up in production behind it.",
  ],
  email: "hello@example.com",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
  },
  skillGroups: [
    {
      label: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      label: "Backend",
      skills: [
        "Python",
        "FastAPI",
        "Django",
        "Node.js",
        "PostgreSQL",
        "REST APIs",
      ],
    },
    {
      label: "AI / ML",
      skills: [
        "PyTorch",
        "Computer Vision",
        "Deep Learning",
        "Machine Learning",
        "Model Deployment",
      ],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      title: "Sightline",
      description:
        "An AI vision platform for automated visual inspection — upload footage, define defect classes, and review model detections in a realtime dashboard. PyTorch models served through FastAPI with a Next.js frontend.",
      tech: ["Next.js", "TypeScript", "FastAPI", "PyTorch", "PostgreSQL"],
      links: { github: "#" },
      accent: "linear-gradient(135deg, #3d4a5c, #0a0a0c)",
    },
    {
      title: "Relay Board",
      description:
        "A realtime collaboration dashboard where distributed teams plan and track work together. WebSocket-driven presence, live cursors, and optimistic updates backed by a Node.js event pipeline.",
      tech: ["React", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
      links: { github: "#" },
      accent: "linear-gradient(135deg, #4a3d5c, #0a0a0c)",
    },
    {
      title: "Foundry ML",
      description:
        "An MLOps tool for managing training pipelines end to end — dataset versioning, experiment tracking, and one-command deployment of models as containerized services.",
      tech: ["Python", "Django", "Docker", "Celery", "PyTorch"],
      links: { github: "#" },
      accent: "linear-gradient(135deg, #3d5c4a, #0a0a0c)",
    },
    {
      title: "Briefcast",
      description:
        "An LLM-powered research assistant that turns long documents and transcripts into structured, citable briefs. Retrieval-augmented generation with streaming responses and source-grounded answers.",
      tech: ["Next.js", "FastAPI", "LLMs", "RAG", "Vector Search"],
      links: { github: "#" },
      accent: "linear-gradient(135deg, #5c553d, #0a0a0c)",
    },
  ] satisfies Project[],
  experience: [
    {
      period: "2023 — Present",
      role: "Full Stack & ML Engineer",
      org: "Placeholder Labs",
      summary:
        "Building AI-driven products across the stack — from Next.js frontends to PyTorch models served in production.",
      highlights: [
        "Designed and shipped a computer-vision inspection pipeline serving predictions at sub-100ms latency.",
        "Led the migration of a legacy dashboard to Next.js and TypeScript, cutting page load times in half.",
        "Set up model deployment and monitoring workflows that took releases from days to hours.",
      ],
    },
    {
      period: "2021 — 2023",
      role: "Full Stack Developer",
      org: "Placeholder Studio",
      summary:
        "Delivered web applications for client teams, owning features from database schema to polished UI.",
      highlights: [
        "Built REST APIs in Django and FastAPI powering several client-facing products.",
        "Introduced end-to-end TypeScript across frontend and Node.js services, reducing production bugs.",
        "Mentored junior developers on React patterns and code review practice.",
      ],
    },
    {
      period: "2020 — 2021",
      role: "Software Developer (Junior)",
      org: "Placeholder Tech",
      summary:
        "Started out shipping features on a production React and Python codebase and learning how real systems are run.",
      highlights: [
        "Implemented UI components and forms used daily by thousands of users.",
        "Wrote data-processing scripts and internal tooling in Python.",
        "Contributed to the team's first machine-learning prototype for document classification.",
      ],
    },
  ] satisfies ExperienceEntry[],
};

export type Site = typeof site;
