import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onCloseModal, modalData }) => {
  useEffect(() => {
    const onClickESC = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onClickESC);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onClickESC);
    };
  }, [onCloseModal]);

  // componentWillUnmount() {
  //   document.body.style.overflow = 'auto';
  //   window.removeEventListener('keydown', this.onClickESC);
  // }

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  const { largeImageURl, tags } = modalData;

  return (
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>
        <img src={largeImageURl} alt={tags} width="900" height="900" />
      </div>
    </div>
  );
};
