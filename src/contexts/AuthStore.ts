import { create } from 'zustand'
import { UserDto } from '@/types';

interface ValueData {
  user?: UserDto;
  isLogin?: boolean;
}

interface Value {
  data?: ValueData;
  _lastUpdate?: Date;
  _seconds?: number;
  _isLoaded?: boolean;
  _forceUpdate?: boolean;
}

interface AuthStore {
  value: Value

  changeValue: (newValue: Value) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  value: {},

  changeValue: (newValue) =>
    set((state) => ({
      ...state,
      value: newValue,
    })),

}));
