import { RollingOffer } from 'customers-templates';

const PRODUCTS = [
  { id: '1', name: 'Starter Pack' },
  { id: '2', name: 'Speed Boost' },
  { id: '3', name: 'Shield' },
  { id: '4', name: 'Gem Bundle' },
  { id: '5', name: 'Power-Up' },
];

const Page = () => (
  <main
    style={{
      minHeight: '100vh',
      background: '#111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}
  >
    <div style={{ width: '100%', maxWidth: '720px' }}>
      <RollingOffer
        products={PRODUCTS}
        title="Daily Offer"
        endsAt={new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()}
      />
    </div>
  </main>
);

export default Page;
