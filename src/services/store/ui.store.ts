import {create} from "zustand";

export type UiStoreStates = {
    navStatus: boolean;
    navStatusWithDelay: boolean;
    setNavStatus: (status: boolean) => void;
    resetEverything: any;
}

export const useUiStore = create<UiStoreStates>((set) => ({
    // True: Nav is open | False: Nav is close
    navStatus: false,
    navStatusWithDelay: false,
    setNavStatus: (status: boolean) => {
        set({navStatus: status})
        setTimeout(() => {
            set({navStatusWithDelay: status})
        }, 300)
    },
    resetEverything: set({}, true),
}))