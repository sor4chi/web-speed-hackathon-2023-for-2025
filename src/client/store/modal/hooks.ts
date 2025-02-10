import { useAtomValue, useSetAtom } from 'jotai';

import type { ModalKey } from './state';
import { modalState } from './state';

export const useIsOpenModal = (key: ModalKey) => {
  const modalKey = useAtomValue(modalState);

  return modalKey === key;
};

export const useOpenModal = () => {
  const setModal = useSetAtom(modalState);

  return (key: ModalKey) => {
    setModal(key);
  };
};

export const useCloseModal = () => {
  const setModal = useSetAtom(modalState);

  return () => {
    setModal(undefined);
  };
};
