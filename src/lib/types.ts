interface Post {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  authorId: number;
  image: string;
  publishedAt: string;
  views: number;
  category?: Category;
  author?: Author;
}
export interface Category {
  id: number;
  name: string;
  image: string;
}
export interface Author {
  id: number;
  name: string;
  bio: string;
  avatar: string;
}

export type { Post };
