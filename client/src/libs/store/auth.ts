import { atom } from 'recoil';

const authAtom = atom({
  key: 'authAtom',
  default: {
    user: null,
  },
});

export default authAtom;
