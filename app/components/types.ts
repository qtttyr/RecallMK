export interface MemoryItem {
  id: string;
  kind: "code" | "text" | "link" | "image";
  title: string;
  body: string;
  app: string;
  time: string;
  score: number;
}

export interface ArchitectureTab {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}
