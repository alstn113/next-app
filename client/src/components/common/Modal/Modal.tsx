import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import * as S from './Modal.styles';

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
  onCancel,
  onConfirm,
}: Props) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && closed) return null;

  return (
    <S.Fullscreen>
      <S.ModalBlock visible={visible}>
        <h3>{title}</h3>
        <p>{message}</p>
        <S.ButtonArea>
          <Button color="error" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button color="success" onClick={onConfirm}>
            {confirmText}
          </Button>
        </S.ButtonArea>
      </S.ModalBlock>
    </S.Fullscreen>
  );
};

export default Modal;
