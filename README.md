# Universal Bridge Marketplace - NFT Gaming Marketplace

This is a Next.js-based NFT marketplace focused on gaming items, built using the thirdweb SDK. The marketplace allows users to buy, sell, and trade digital gaming assets as NFTs.

## Project Description

The Universal Bridge Marketplace is a pixel-themed NFT marketplace for gaming items like swords, staffs, and potions. Users can connect their wallets, browse available NFTs, view details, and make purchases. The platform is built on the Arbitrum Sepolia testnet.

## Key Features

- Browse NFT listings with detailed attributes (power, ability, level)
- Connect wallet functionality
- Like/favorite NFTs
- Category-based browsing
- Purchase NFTs directly through the marketplace
- Pixel-themed UI design

## Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Web3**: thirdweb SDK
- **Blockchain**: Arbitrum Sepolia testnet
- **UI Components**: Radix UI, Lucide React icons

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important Setup

Before running the application, you must configure your thirdweb client ID in `app/client.ts`:

1. Open the file `app/client.ts`
2. Replace `"YourClientId"` with your actual thirdweb Client ID
3. Save the file

The application cannot interact with blockchain data without a valid Client ID.

## Smart Contracts

The marketplace uses the following contract:
- Marketplace Contract: `0xBF57555F08FFe720a97491cfb10E6511949798f3` (on Arbitrum Sepolia)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [thirdweb Documentation](https://thirdweb.com/)
