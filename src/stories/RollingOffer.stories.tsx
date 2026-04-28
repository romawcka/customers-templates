import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { RollingOffer } from '../components/RollingOffer/RollingOffer';
import type { RollingOfferProps } from '../components/RollingOffer/types';

const endsAt = new Date(Date.now() + 22 * 3_600_000 + 22 * 60_000 + 22_000);

const meta = {
  title: 'Customers Templates/RollingOffer',
  component: RollingOffer,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['auto', 'mobile', 'desktop'],
      description: 'Force a layout mode. "auto" uses responsive breakpoints.',
    },
    title: { control: 'text' },
    endsAt: { control: false },
    onProductClick: { control: false },
    collectTrigger: { control: false },
    products: { control: 'object' },
  },
} satisfies Meta<typeof RollingOffer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Rolling Offer',
    layout: 'mobile',
    endsAt,
    products: [
      { id: '1', name: 'Product 1', price: '$3.90' },
      { id: '2', name: 'Product 2', price: '$3.90' },
      { id: '3', name: 'Product 3', price: '$3.90' },
      { id: '4', name: 'Product 4', price: '$3.90' },
      { id: '5', name: 'Product 5', price: '$3.90' },
      { id: '6', name: 'Product 6', price: '$3.90' },
    ],
  },
};

export const Demonstration: Story = {
  args: {
    title: 'Rolling Offer',
    layout: 'mobile',
    endsAt,
    collectTrigger: 0,
    products: [
      {
        id: '1',
        name: 'Classic Bag',
        imageUrl:
          'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
      {
        id: '2',
        name: 'Soft Hoodie',
        imageUrl:
          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
      {
        id: '3',
        name: 'Daily Sneakers',
        imageUrl:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
      {
        id: '4',
        name: 'Travel Bottle',
        imageUrl:
          'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
      {
        id: '5',
        name: 'Noise Headphones',
        imageUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
      {
        id: '6',
        name: 'Desk Lamp',
        imageUrl:
          'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80',
        price: '$3.90',
      },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs<RollingOfferProps>();

    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => updateArgs({ collectTrigger: Number(args.collectTrigger ?? 0) + 1 })}
          className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-black shadow-sm"
        >
          Trigger Collect
        </button>

        <RollingOffer {...args} />
      </div>
    );
  },
};
