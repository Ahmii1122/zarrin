interface Post {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId?: number;
  authorUid?: string;
  image?: string;
  images?: string[];
  createdAt: string;
  views: number;
  category?: Category;
  author?: Author;
  categoryName?: string;
}
export interface Category {
  id: string;
  name: string;
  image: string;
}
export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}

export type { Post };
