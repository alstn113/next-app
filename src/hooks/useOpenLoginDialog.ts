import useModalStore from '@/lib/store/useModalStore';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const useOpenLoginDialog = () => {
  const router = useRouter();
  const { open } = useModalStore();
  const openLoginDialog = useCallback(
    () =>
      open({
        title: '로그인 후 이용해주세요.',
        message: '로그인이 필요합니다.',
        confirmText: '로그인',
        cancelText: '취소',
        onConfirm: () => router.push(`/login?next=${router.pathname}`),
      }),
    [open, router],
  );

  return openLoginDialog;
};

export default useOpenLoginDialog;
