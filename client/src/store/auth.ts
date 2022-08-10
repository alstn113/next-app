import { atom } from 'recoil';
import { IUser } from '../lib/interfaces';

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
