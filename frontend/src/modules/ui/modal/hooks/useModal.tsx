import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return { openModal, open, onClose };
};
