'use client';

import { CARD, COL_GAP, GRID_W, ROW_GAP } from '@/components/RollingOffer/constants';
import { ProductCard } from '@/components/RollingOffer/ProductCard';
import type { RollingOfferProduct } from '@/components/RollingOffer/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Phase = 'idle' | 'processing' | 'revealing' | 'flying';

const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

type MobileGridProps = {
  products: RollingOfferProduct[];
  onProductClick?: (product: RollingOfferProduct) => void;
  collectTrigger?: number;
};

export const MobileGrid = ({ products, onProductClick, collectTrigger }: MobileGridProps) => {
  const [collected, setCollected] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const lastCollectTriggerRef = useRef(collectTrigger);

  useEffect(() => {
    if (phase === 'idle') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  const visible = products.slice(collected);
  const rowCount = Math.ceil(visible.length / 2);
  const containerH = rowCount > 0 ? rowCount * CARD + (rowCount - 1) * ROW_GAP : 0;

  const pos = (i: number) => ({
    x: i % 2 === 0 ? 0 : CARD + COL_GAP,
    y: Math.floor(i / 2) * (CARD + ROW_GAP),
  });

  const handleCollect = async (product: RollingOfferProduct) => {
    if (phase !== 'idle') return;
    onProductClick?.(product);

    setPhase('processing');
    await wait(600);

    setPhase('revealing');
    await wait(1500);

    setPhase('flying');
    await wait(500);

    setCollected((c) => c + 1);
    setPhase('idle');
  };

  useEffect(() => {
    if (collectTrigger === undefined || collectTrigger === lastCollectTriggerRef.current) return;

    lastCollectTriggerRef.current = collectTrigger;

    if (phase !== 'idle' || !visible[0]) return;

    void handleCollect(visible[0]);
  }, [collectTrigger, phase, visible]);

  return (
    <div style={{ width: GRID_W }}>
      <div className="relative" style={{ height: containerH }}>
        <AnimatePresence>
          {visible.map((product, i) => {
            const { x, y } = pos(i);
            return (
              <motion.div
                key={product.id}
                className="absolute"
                style={{ width: CARD, height: CARD }}
                initial={{ x, y, opacity: 0, scale: 0.88 }}
                animate={{ x, y, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
                transition={{
                  x: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                }}
              >
                <ProductCard
                  product={product}
                  isActive={i === 0}
                  onClick={() => handleCollect(product)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Horizontal arrows between card pairs in the same row */}
        {visible.map((_, i) => {
          if (i % 2 !== 0 || i + 1 >= visible.length) return null;
          const ri = Math.floor(i / 2);
          const even = ri % 2 === 0;
          return (
            <div
              key={`ha-${i}`}
              className="absolute flex items-center justify-center select-none pointer-events-none"
              style={{ left: CARD, top: ri * (CARD + ROW_GAP), width: COL_GAP, height: CARD }}
            >
              <span className="text-white font-bold text-2xl">{even ? '>' : '<'}</span>
            </div>
          );
        })}

        {/* Vertical arrows between rows */}
        {Array.from({ length: rowCount - 1 }, (_, ri) => {
          const even = ri % 2 === 0;
          return (
            <div
              key={`va-${ri}`}
              className="absolute flex items-center justify-center select-none pointer-events-none"
              style={{
                left: even ? CARD + COL_GAP : 0,
                top: (ri + 1) * CARD + ri * ROW_GAP,
                width: CARD,
                height: ROW_GAP,
              }}
            >
              <span className="text-white font-bold text-2xl">⌄</span>
            </div>
          );
        })}
      </div>

      {/* Processing overlay */}
      <AnimatePresence>
        {phase === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              className="w-14 h-14 rounded-full border-4 border-white/30 border-t-white"
            />
            <p className="mt-4 text-white text-xl font-bold">Processing</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Item reveal overlay */}
      <AnimatePresence>
        {(phase === 'revealing' || phase === 'flying') && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.3, y: 0, opacity: 1 }}
              animate={
                phase === 'revealing'
                  ? { scale: 1.1, y: 0, opacity: 1 }
                  : { scale: 0.7, y: -480, opacity: 0 }
              }
              transition={
                phase === 'revealing'
                  ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 0.5, ease: 'easeIn' }
              }
              className="relative flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute inset-0 -m-10 rounded-full bg-yellow-300/40 blur-3xl"
              />
              {visible[0]?.imageUrl ? (
                <img
                  src={visible[0].imageUrl}
                  alt={visible[0].name}
                  className="relative w-36 h-36 object-contain drop-shadow-2xl"
                />
              ) : (
                <span className="relative text-8xl drop-shadow-2xl">⭐</span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
