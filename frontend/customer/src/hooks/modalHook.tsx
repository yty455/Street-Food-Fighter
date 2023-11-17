import { useState } from 'react';

const useModal = (initialMode = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialMode);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item?: any) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return {
    isModalOpen,
    selectedItem,
    openModal,
    closeModal,
  };
};

export default useModal;
