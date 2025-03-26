export interface PostMetadata {
  slug: string;
  date: Date;
  title: string;
  tags: string[];
}

export interface PostDetail {
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