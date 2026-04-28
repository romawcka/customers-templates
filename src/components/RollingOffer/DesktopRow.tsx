'use client';

import { ProductCard } from '@/components/RollingOffer/ProductCard';
import type { RollingOfferProduct } from '@/components/RollingOffer/types';

type DesktopRowProps = {
  products: RollingOfferProduct[];
  onProductClick?: (product: RollingOfferProduct) => void;
};

export const DesktopRow = ({ products, onProductClick }: DesktopRowProps) => (
  <div className="flex items-end gap-3 overflow-x-auto">
    {products.map((product, i) => (
      <div key={product.id} className="flex items-center gap-3 shrink-0">
        <div className="w-50 h-50">
          <ProductCard
            product={product}
            isActive={i === 0}
            onClick={() => onProductClick?.(product)}
          />
        </div>
        {i < products.length - 1 && (
          <span className="text-white font-bold text-xl select-none">›</span>
        )}
      </div>
    ))}
  </div>
);
