import useModalStore from '@/lib/store/useModalStore';
import { useCallback } from 'react';
import Modal from './common/@Components/Modal/Modal';

const ModalProvider = () => {
  const { config, setVisible, visible } = useModalStore();

  const onCacel = useCallback(() => {
    config?.onCacel?.();
    setVisible(false);
  }, [config, setVisible]);

  const onConfirm = useCallback(() => {
    config?.onConfirm();
    setVisible(false);
  }, [config, setVisible]);

  return (
    <Modal
      title={config?.title || ''}
      message={config?.message || ''}
      cancelText={config?.cancelText}
      confirmText={config?.confirmText}
      visible={visible}
      onCancel={onCacel}
      onConfirm={onConfirm}
    />
  );
};

export default ModalProvider;
