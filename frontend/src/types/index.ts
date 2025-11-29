export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author_id: string;
  author_username: string;
  created_at: string;
  updated_at: string;
  published?: boolean;
  tags: string[];
  likes: number;
  viewCount: number;
  coverImage?: string;
}

export interface Tag {
  name: string;
  count: number;
}
