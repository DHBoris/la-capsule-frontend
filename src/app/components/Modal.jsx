// Modal.js
import React, { useEffect } from 'react';
import styles from '../assets/styles/components/modal.module.css';

const Modal = ({ children, onClose, isAutoClose }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('modalOverlay')) {
        onClose();
      }
    };

    if (isAutoClose) {
      const timerId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timerId);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isAutoClose, onClose]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
