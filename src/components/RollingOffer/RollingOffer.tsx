'use client';

import { DesktopRow } from '@/components/RollingOffer/DesktopRow';
import { MobileGrid } from '@/components/RollingOffer/MobileGrid';
import type { RollingOfferProps } from '@/components/RollingOffer/types';
import { useCountdown } from '@/components/RollingOffer/useCountdown';
import { cn } from '@/shared/lib/cn';

export const RollingOffer = (props: RollingOfferProps) => {
  const {
    products,
    title = 'Rolling Offer',
    endsAt,
    layout = 'auto',
    onProductClick,
    className,
    collectTrigger,
  } = props;

  const countdown = useCountdown(endsAt);

  if (!products.length) return null;

  const showDesktop = layout === 'desktop' || layout === 'auto';
  const showMobile = layout === 'mobile' || layout === 'auto';

  return (
    <section className={cn('bg-black text-white rounded-3xl p-6 md:p-10', className)}>
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-5xl min-h-20 md:text-7xl font-black italic leading-none bg-linear-to-b from-yellow-300 to-orange-500 bg-clip-text text-transparent">
          {title}
        </h2>
        {countdown !== null && (
          <p className="mt-4 text-sm font-bold text-white">Ends in {countdown}</p>
        )}
      </div>

      {showDesktop && (
        <div className={cn(layout === 'auto' && 'hidden md:block')}>
          <DesktopRow products={products} onProductClick={onProductClick} />
        </div>
      )}

      {showMobile && (
        <div className={cn('flex justify-center', layout === 'auto' && 'md:hidden')}>
          <MobileGrid
            products={products}
            onProductClick={onProductClick}
            collectTrigger={collectTrigger}
          />
        </div>
      )}
    </section>
  );
};
