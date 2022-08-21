import { atom } from 'recoil';
import type { User } from '@/lib/types';

export interface IState {
  user: User | null;
}

const authAtom = atom<IState>({
  key: 'authAtom',
  default: {
    user: null,
  },
});

export default authAtom;
