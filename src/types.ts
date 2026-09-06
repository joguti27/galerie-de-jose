export interface ProjectItem {
  id: string;
  date: string;
  title: string;
  role?: string;
  year?: string;
  description?: string;
  link?: string;
}

export interface BlogItem {
  id: string;
  date: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  quote?: string;
}
