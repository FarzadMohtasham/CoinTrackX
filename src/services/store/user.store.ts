import { create } from 'zustand';
import { AuthUser } from '@supabase/supabase-js';

type States = {
  user: AuthUser | null;
};

type Actions = {
  setUser: (user: AuthUser) => void;
};

const userStore = create<States & Actions>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user: user });
  },
}));

export default userStore;
