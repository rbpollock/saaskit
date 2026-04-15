import { create } from 'zustand';

interface WalletAddresses {
  evm: string | null;
  cosmos: string | null;
  tezos: string | null;
  lightning: string | null;
}

interface WalletState {
  addresses: WalletAddresses;
  setAddress: (chain: keyof WalletAddresses, address: string | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  addresses: {
    evm: null,
    cosmos: null,
    tezos: null,
    lightning: null,
  },
  setAddress: (chain, address) =>
    set((state) => ({
      addresses: { ...state.addresses, [chain]: address },
    })),
}));
