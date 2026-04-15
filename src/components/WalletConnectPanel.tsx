'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useChain } from '@cosmos-kit/react';
import { Button } from '@/components/ui/button';
import { useTezosWallet } from '@/hooks/useTezosWallet';
import { useSignMessage, useAccount } from 'wagmi';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';


const BitcoinConnectButton = dynamic(
  () => import('@getalby/bitcoin-connect-react').then((mod) => {
    // Correct exports for @getalby/bitcoin-connect-react are Button or Connect
    return mod.Button || mod.Connect || (mod as any).default?.Button || mod.default;
  }),
  { ssr: false }
);

/**
 * WalletConnectPanel
 * A display component that renders connection buttons for all four supported ecosystems.
 */
export function WalletConnectPanel() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // We can't use useChain until we're on the client AND inside the provider
  return mounted ? <WalletConnectPanelContent /> : <div className="h-20 animate-pulse bg-muted rounded-xl" />;
}

function WalletConnectPanelContent() {
  const { connect: connectCosmos, address: cosmosAddress } = useChain('osmosis');
  const { connect: connectTezos, disconnect: disconnectTezos, address: tezosAddress } = useTezosWallet();
  const { signMessageAsync } = useSignMessage();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  // Automated SIWE for EVM
  React.useEffect(() => {
    const handleEvmSignIn = async () => {
      if (isEvmConnected && evmAddress && !isSigningIn) {
        // Only trigger if not already signed in (we could check session here, but for now simple)
        // In a real app, you might want a "Sign In" button that appears after connection
        // but for "diagnosing" let's make it smooth.
        
        // Use a timeout to avoid immediate popup on mount if already connected
        const timeout = setTimeout(async () => {
          try {
            setIsSigningIn(true);
            const message = `Sign in to irl.coop\n\nAddress: ${evmAddress}\nTimestamp: ${Date.now()}`;
            const signature = await signMessageAsync({ message });
            
            const result = await signIn('wallet', {
              address: evmAddress,
              signature,
              message,
              chain: 'evm',
              redirect: true,
              callbackUrl: '/dashboard',
            });

            if (result?.error) {
              toast.error(result.error);
            }
          } catch (err: any) {
            if (err.message?.includes('User rejected')) {
              toast.error("Signature rejected by user");
            } else {
              console.error("Wallet sign-in error", err);
              toast.error("Failed to sign in with wallet");
            }
          } finally {
            setIsSigningIn(false);
          }
        }, 500);
        return () => clearTimeout(timeout);
      }
    };
    handleEvmSignIn();
  }, [evmAddress, isEvmConnected, signMessageAsync]);

  return (
    <div className="relative flex flex-wrap gap-8 items-start justify-center p-6 rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] shadow-sm">
      {isSigningIn && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#efe6dc]/80 rounded-[2rem] backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#1f1b18]" />
            <span className="text-sm font-medium">Authenticating...</span>
          </div>
        </div>
      )}
      {/* EVM - RainbowKit */}
      <div className="flex flex-col gap-3 items-center min-w-[140px]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#73685e]">Ethereum / EVM</span>
        <RainbowConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
      </div>

      {/* Cosmos - CosmosKit */}
      <div className="flex flex-col gap-3 items-center min-w-[140px]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#73685e]">Cosmos Ecosystem</span>
        <Button 
          onClick={() => connectCosmos()}
          variant="outline"
          className="h-10 rounded-full border-[#1f1b18] text-[#1f1b18] hover:bg-[#1f1b18] hover:text-[#f3eadf]"
        >
          {cosmosAddress ? `${cosmosAddress.slice(0, 6)}...${cosmosAddress.slice(-4)}` : "Connect Cosmos"}
        </Button>
      </div>

      {/* Tezos - Octez.Connect */}
      <div className="flex flex-col gap-3 items-center min-w-[140px]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#73685e]">Tezos Network</span>
        <Button 
          onClick={() => tezosAddress ? disconnectTezos() : connectTezos()}
          variant="outline"
          className="h-10 rounded-full border-[#1f1b18] text-[#1f1b18] hover:bg-[#1f1b18] hover:text-[#f3eadf]"
        >
          {tezosAddress ? `${tezosAddress.slice(0, 6)}...${tezosAddress.slice(-4)}` : "Connect Tezos"}
        </Button>
      </div>

      {/* Bitcoin/Lightning - Alby */}
      <div className="flex flex-col gap-3 items-center min-w-[140px]">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#73685e]">Bitcoin / L2</span>
        <BitcoinConnectButton />
      </div>
    </div>
  );
}
