import { AnimatePresence } from 'framer-motion';
import * as S from './Modal.styles';
import Button from '../Button/Button';
import Portal from '@/components/Potal';

export interface Props {
  visible: boolean;
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  visible,
  title,
  message,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Portal id="modal">
      <AnimatePresence>
        {visible && (
          <>
            <S.Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <S.Positioner>
              <S.ModalBlock
                initial={{ y: '30vh', opacity: 0, scale: 0.5 }}
                animate={{ y: '0vh', opacity: 1, scale: 1 }}
                exit={{ y: '30vh', opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <S.Title>{title}</S.Title>
                <S.Message>{message}</S.Message>
                <S.Footer>
                  <Button shadow size="sm" color="error" onClick={onCancel}>
                    {cancelText}
                  </Button>
                  <Button shadow size="sm" color="success" onClick={onConfirm}>
                    {confirmText}
                  </Button>
                </S.Footer>
              </S.ModalBlock>
            </S.Positioner>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Modal;
