import { create } from 'zustand';
import { User } from 'firebase/auth';

// Define the type for the store's state and actions
interface AuthState {
  user: User | null;
  name?: string; // Optional
  address?: string; // Optional
  age?: number; // Optional
  gender?: string; // Optional
  contactNumber?: string; // Optional
  emergencyDial?: string; // Optional
  userType: string; // Keep as required since it defaults to 'patient'
  setUser: (user: User | null) => void;
  setUserProfile: (profile: Partial<Omit<AuthState, 'user' | 'userType'>>) => void; // Set profile fields, excluding user and userType
  logOutUser: () => void;
}

// Store user data and profile in Zustand
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  name: '',
  address: '',
  age: 0,
  gender: '',
  contactNumber: '',
  emergencyDial: '',
  userType: 'patient',

  setUser: (user: User | null) => set(() => ({ user })),

  setUserProfile: (profile) => set((state) => ({ ...state, ...profile })), // Merging profile data

  logOutUser: () => set(() => ({
    user: null,
    name: '',
    address: '',
    age: 0,
    gender: '',
    contactNumber: '',
    emergencyDial: '',
    userType: 'patient',
  })),
}));
