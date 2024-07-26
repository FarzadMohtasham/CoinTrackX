import { create } from 'zustand';

type States = {
   navStatus: boolean;
   navStatusWithDelay: boolean;
};

type Actions = {
   setNavStatus: (status: boolean) => void;
   resetEverything: any;
};

export const useUiStore = create<States & Actions>((set) => ({
   // True: Nav is open | False: Nav is close
   navStatus: false,
   navStatusWithDelay: false,
   setNavStatus: (status: boolean) => {
      set({ navStatus: status });
      setTimeout(() => {
         set({ navStatusWithDelay: status });
      }, 300);
   },
   resetEverything: set({}, true),
}));
