interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  category: string;
  description: string;
  specifications: Record<string, string>;
}

interface PaginatedResponse<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

interface ProductListParams {
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}