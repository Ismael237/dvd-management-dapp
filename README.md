# DVD Management DApp

A decentralized application (DApp) for managing DVD rentals and sales using Ethereum smart contracts. Built with React, TypeScript, and Vite.

## Features

- Wallet integration with MetaMask
- DVD listing and management
- Smart contract interaction for DVD transactions
- Responsive UI with Chakra UI

## Prerequisites

- Node.js >=18
- pnpm
- A running Ethereum node or service (e.g., Ganache for development)
- MetaMask browser extension

## Setup

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```plaintext
VITE_CONTRACT_ADDRESS="your_deployed_contract_address"
VITE_PROVIDER_URL="your_ethereum_node_url"
SECRET_KEY="your_ethereum_private_key"
```

4. Deploy the smart contract:
```bash
tsx --env-file=.env src/utils/contract/contract-deployer.ts
```

5. Start the development server:
```bash
pnpm dev
```

6. Build the project:
```bash
pnpm build
```

## Project Structure

```
src/
  ├── core/          # Domain logic and business rules
  ├── ui/            # React components and UI logic
  ├── utils/         # Utility functions and helpers
  │   └── contract/  # Smart contract integration
  └── main.tsx       # Application entry point
```