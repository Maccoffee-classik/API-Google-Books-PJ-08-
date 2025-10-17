export interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  fallBackImg?: string;
  rating?: number;
  ratingsCount?: number;
  price?: string;
  isbn?: string;
  generateRandomPrice?: () => string;
}
