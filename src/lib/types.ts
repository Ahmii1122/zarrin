interface Post {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  authorId: number;
  image: string;
  publishedAt: string;
  views: number;
  categoryName?: string;
}
export interface Category {
  id: number;
  name: string;
}

export type { Post };
