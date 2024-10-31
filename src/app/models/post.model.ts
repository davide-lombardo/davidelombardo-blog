export interface Post {
  slug: string;
  date: Date;
  title: string;
}

export interface PostMetadata {
  title: string;
  subtitle: string;
  date: string;
  tags: string[];  
  comments_off?: boolean; 
  infoPanel?: {
    title: string;
    description: string[];
  }
}