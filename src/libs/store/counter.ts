import { atom } from 'recoil';

const counterAtom = atom({
  key: 'counterAtom',
  default: {
    count: 0,
  },
});

export default counterAtom;
