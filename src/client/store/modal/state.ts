import { atom } from 'jotai';

export type ModalKey = 'SIGN_UP' | 'SIGN_IN';
export const modalState = atom<ModalKey | undefined>(undefined);
