/* eslint-disable react/react-in-jsx-scope */
'use client';

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/modals/create-store';
import { QuickPickModal } from '@/components/modals/quick-pick';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
      <QuickPickModal />
    </>
  );
};
