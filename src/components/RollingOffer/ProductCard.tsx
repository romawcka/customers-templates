'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/cn';
import type { RollingOfferProduct } from './types';

type ProductCardProps = {
  product: RollingOfferProduct;
  isActive: boolean;
  onClick: () => void;
};

export const ProductCard = ({ product, isActive, onClick }: ProductCardProps) => (
  <motion.button
    type="button"
    whileHover={isActive ? { scale: 1.03 } : undefined}
    whileTap={isActive ? { scale: 0.96 } : undefined}
    onClick={isActive ? onClick : undefined}
    className={cn(
      'w-full h-full flex flex-col overflow-hidden rounded-2xl bg-amber-50 border-0 p-0 focus-visible:outline-2 focus-visible:outline-orange-400',
      isActive ? 'cursor-pointer' : 'cursor-default',
    )}
  >
    <div className="relative flex-1 bg-amber-50 overflow-hidden">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm font-bold text-zinc-900">
          {product.name}
        </div>
      )}
      {product.imageUrl ? (
        <div className="absolute inset-x-0 bottom-0 bg-black/55 px-2 py-1.5 text-center text-xs font-bold text-white">
          {product.name}
        </div>
      ) : null}
    </div>
    <div className="py-2 flex items-center justify-center shrink-0 bg-green-500">
      {isActive ? (
        <span className="text-white text-sm font-bold">FREE</span>
      ) : (
        <span className="text-white text-sm font-bold">🔒 {product.price ?? 'FREE'}</span>
      )}
    </div>
  </motion.button>
);
