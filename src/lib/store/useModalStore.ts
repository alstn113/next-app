import produce from 'immer';
import create from 'zustand';

interface ModalConfig {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onCacel?: () => void;
  onConfirm: () => void;
}

type States = {
  visible: boolean;
  config: ModalConfig | null;
};

type Actions = {
  setVisible: (value: boolean) => void;
  open: (config: ModalConfig) => void;
};

const useModalStore = create<States & Actions>((set) => ({
  visible: false,
  config: null,
  setVisible: (value) =>
    set(
      produce((states: States) => {
        states.visible = value;
      }),
    ),
  open: (config) =>
    set(
      produce((states: States) => {
        states.visible = true;
        states.config = config;
      }),
    ),
}));

export default useModalStore;
