import { atom } from 'recoil';
import type { IUser } from '@/lib/types';

export interface IState {
  user: IUser | null;
}

const authAtom = atom<IState>({
  key: 'authAtom',
  default: {
    user: null,
  },
});

export default authAtom;
