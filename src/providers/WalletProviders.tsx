'use client';

import React, { useEffect, useState, useMemo } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, useAccount } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import dynamic from 'next/dynamic';
import { useWalletStore } from '@/context/WalletContext';
import { useTheme } from 'next-themes';
import '@interchain-ui/react/styles';

// Dynamically import heavy/browser-only providers
const ChainProvider = dynamic(
  async () => {
    try {
      const [mod, keplr] = await Promise.all([
        import('@cosmos-kit/react'),
        import('@cosmos-kit/keplr')
      ]);
      
      const wallets = [
        ...(keplr?.wallets || [])
      ];

      return (props: any) => (
        <mod.ChainProvider 
          {...props} 
          wallets={wallets} 
        />
      );
    } catch (e) {
      console.warn("CosmosKit modules failed to load, falling back to dummy provider", e);
      return ({ children }: any) => <>{children}</>;
    }
  },
  { ssr: false }
);

/**
 * SOLID APPROACH: 
 * Hardcoded minimal chain/asset configurations to avoid the massive 
 * and often unstable 'chain-registry' root package in Next.js Dev/SSR.
 */
const OSMOSIS_CHAIN = {
  chain_name: 'osmosis',
  status: 'live',
  network_type: 'mainnet',
  pretty_name: 'Osmosis',
  chain_id: 'osmosis-1',
  bech32_prefix: 'osmo',
  slip44: 118,
  apis: {
    rpc: [{ address: 'https://rpc.osmosis.zone' }],
    rest: [{ address: 'https://lcd.osmosis.zone' }]
  }
};

const COSMOSHUB_CHAIN = {
  chain_name: 'cosmoshub',
  status: 'live',
  network_type: 'mainnet',
  pretty_name: 'Cosmos Hub',
  chain_id: 'cosmoshub-4',
  bech32_prefix: 'cosmos',
  slip44: 118,
  apis: {
    rpc: [{ address: 'https://rpc-cosmoshub.blockapsis.com' }],
    rest: [{ address: 'https://lcd-cosmoshub.blockapsis.com' }]
  }
};

const OSMOSIS_ASSETS = {
  chain_name: 'osmosis',
  assets: [
    {
      description: 'The native token of Osmosis',
      denom_units: [{ denom: 'uosmo', exponent: 0 }, { denom: 'osmo', exponent: 6 }],
      base: 'uosmo',
      name: 'Osmosis',
      display: 'osmo',
      symbol: 'OSMO'
    }
  ]
};

const COSMOSHUB_ASSETS = {
  chain_name: 'cosmoshub',
  assets: [
    {
      description: 'The native token of Cosmos Hub',
      denom_units: [{ denom: 'uatom', exponent: 0 }, { denom: 'atom', exponent: 6 }],
      base: 'uatom',
      name: 'Cosmos Hub',
      display: 'atom',
      symbol: 'ATOM'
    }
  ]
};

const chains = [OSMOSIS_CHAIN, COSMOSHUB_CHAIN];
const assetLists = [OSMOSIS_ASSETS, COSMOSHUB_ASSETS];

function EvmSync() {
  const { address, isConnected } = useAccount();
  const setAddress = useWalletStore((state) => state.setAddress);
  useEffect(() => {
    setAddress('evm', isConnected ? address : null);
  }, [address, isConnected, setAddress]);
  return null;
}

const CosmosSyncChild = () => {
  // Use dynamic require to ensure these are only accessed on client
  const { useChain } = require('@cosmos-kit/react');
  const { address } = useChain('osmosis');
  const setAddress = useWalletStore((state: any) => state.setAddress);
  
  useEffect(() => {
    setAddress('cosmos', address || null);
  }, [address, setAddress]);
  
  return null;
};

export function WalletProviders({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const [mounted, setMounted] = useState(false);

  // Initialize Wagmi/RainbowKit Config in a stable way
  const wagmiConfig = useMemo(() => {
    // Return a dummy or minimal config on SSR if needed, 
    // but here we wait for mount to be safe with RainbowKit v2's internals
    if (typeof window === 'undefined') return null;

    try {
      const { getDefaultConfig } = require('@rainbow-me/rainbowkit');
      return getDefaultConfig({
        appName: 'irl.coop',
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'de56788591f13d820986751079313cb1',
        chains: [mainnet, polygon, optimism, arbitrum, base],
        ssr: true,
      });
    } catch (e) {
      console.error("Failed to init wagmi config", e);
      return null;
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Initialize Bitcoin Connect (Alby)
    import('@getalby/bitcoin-connect-react').then((mod) => {
      try {
        mod.init({ appName: 'irl.coop' });
      } catch (e) {
        console.warn("Bitcoin Connect init failed", e);
      }
    });
  }, []);

  const { theme } = useTheme();

  // During SSR and first paint, we return children without providers 
  // to avoid hydration mismatch while loading heavy wallet modules.
  if (!mounted || !wagmiConfig) {
    return <>{children}</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>
          <ChainProvider
            theme={theme === 'dark' ? 'dark' : 'light'}
            chains={chains as any}
            assetLists={assetLists as any}
            walletConnectOptions={{
              signClient: {
                projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
                relayUrl: 'wss://relay.walletconnect.org',
                metadata: {
                  name: 'irl.coop',
                  description: 'Sovereign Community OS',
                  url: 'https://irl.coop',
                  icons: [],
                },
              },
            }}
          >
            <EvmSync />
            <CosmosSyncChild />
            {children}
          </ChainProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
