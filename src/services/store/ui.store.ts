import {create} from "zustand";

export type UiStoreStates = {
    navStatus: boolean;
    setNavStatus: (status: boolean) => void;
    resetEverything: any;
}

export const useUiStore = create<UiStoreStates>((set) => ({
    // True: Nav is open | False: Nav is close
    navStatus: false,
    setNavStatus: (status: boolean) => set({navStatus: status}),
    resetEverything: set({}, true),
}))