'use client';

//>> Hooks
import { useEffect } from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';

const SetupPage = () => {
  //? Get Modal State
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  //=> Spam open if closed.
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  // Return Empty Page, modal is shown at this point
  // '/components/modals/create-store.tsx'
  return <></>;
};

export default SetupPage;
