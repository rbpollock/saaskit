'use client';

import { useRef, useEffect, useState } from 'react';
import { useWalletStore } from '@/context/WalletContext';

export function useTezosWallet() {
  const dAppClient = useRef<any>(null);
  const [address, setAddressState] = useState<string | null>(null);
  const setGlobalAddress = useWalletStore((state) => state.setAddress);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initTezos = async () => {
        // Dynamic import to avoid SSR issues with Tezos SDK
          const sdk = await import('@tezos-x/octez.connect-sdk');
          const DAppClient = sdk.DAppClient;
          const network = (sdk as any).TezosNetwork?.MAINNET || 'mainnet';
          
          if (!dAppClient.current) {
            dAppClient.current = new DAppClient({
              name: 'irl.coop',
              preferredNetwork: network,
            });
          }

        try {
          const activeAccount = await dAppClient.current.getActiveAccount();
          if (activeAccount) {
            setAddressState(activeAccount.address);
            setGlobalAddress('tezos', activeAccount.address);
          }
        } catch (err) {
          console.error('Error getting Tezos active account:', err);
        }
      };
      initTezos();
    }
  }, [setGlobalAddress]);

  const connect = async () => {
    if (!dAppClient.current) {
      // If not initialized yet (should be extremely rare after mount)
      const sdk = await import('@tezos-x/octez.connect-sdk');
      const network = (sdk as any).TezosNetwork?.MAINNET || 'mainnet';
      dAppClient.current = new sdk.DAppClient({
        name: 'irl.coop',
        preferredNetwork: network,
      });
    }

    try {
      const response = await dAppClient.current.requestPermissions();
      setAddressState(response.address);
      setGlobalAddress('tezos', response.address);
    } catch (error) {
      console.error('Tezos connection failed', error);
    }
  };

  const disconnect = async () => {
    if (!dAppClient.current) return;
    try {
      await dAppClient.current.clearActiveAccount();
      setAddressState(null);
      setGlobalAddress('tezos', null);
    } catch (err) {
      console.error('Error disconnecting Tezos:', err);
    }
  };

  return { address, connect, disconnect };
}
