import { create } from 'zustand';
import { User, Role } from '@/src/types/User';

interface AuthState {
  user: User | null;
  switchRole: () => void;
  loginStub: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  switchRole: () =>
    set((state) =>
      state.user
        ? { user: { ...state.user, role: state.user.role === 'jobseeker' ? 'employer' : 'jobseeker' } }
        : state
    ),
  loginStub: (role) =>
    set({
      user: {
        id: 'user1',
        role,
        firstName: 'Максим',
        lastName: 'Чистоедов'
      }
    }),
  logout: () => set({ user: null })
}));