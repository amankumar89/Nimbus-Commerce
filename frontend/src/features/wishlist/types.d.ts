interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
}