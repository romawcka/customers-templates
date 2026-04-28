export type RollingOfferProduct = {
  id: string;
  name: string;
  imageUrl?: string;
  price?: string;
};

export type RollingOfferProps = {
  products: RollingOfferProduct[];
  title?: string;
  endsAt?: Date | string;
  layout?: 'auto' | 'mobile' | 'desktop';
  onProductClick?: (product: RollingOfferProduct) => void;
  className?: string;
  collectTrigger?: number;
};
