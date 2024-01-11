import { useState, useEffect } from 'react';
import css from '../Styles/styles.module.css';
import { requestImagesByQuery } from './Services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from '../Helpers/statuses';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';

export const App = () => {
  const [status, setStatus] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoadMore, setLoadMore] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  // async componentDidUpdate(_, prevState) {
  //   const { page, query } = this.state;
  //   if (page !== prevState.page || prevState.query !== query) {
  //     try {
  //       this.setState({ status: STATUSES.pending });
  //       const { hits, totalHits } = await requestImagesByQuery(query, page);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, ...hits],
  //         isLoadMore: this.state.page < Math.ceil(totalHits / 12),
  //         status: STATUSES.success,
  //       }));
  //     } catch (error) {
  //       this.setState({ error: error.message, status: STATUSES.error });
  //     }
  //   }
  // }

  useEffect(() => {
    if (query === '') {
      return;
    }
    const addImages = async () => {
      try {
        setStatus(STATUSES.pending);
        const { hits, totalHits } = await requestImagesByQuery(query, page);
        setStatus(STATUSES.success);

        if (hits.length === 0) {
          Notiflix.Notify.failure(
            'Sorry there are no images matching your search query.'
          );
          setStatus(STATUSES.idle);
          setLoadMore(false);
          return;
        }

        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setStatus(STATUSES.error);
        Notiflix.Notify.failure(
          `An error occurred while fetching images ${error}`
        );
      }
    };
    addImages();
  }, [query, page]);

  const handleSubmit = findQuery => {
    if (query === findQuery) {
      return;
    }
    setQuery(findQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleOpenModal = (largeImageURl, tags) => {
    setModalData({ largeImageURl, tags });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onImageClick={handleOpenModal} />
      {status === STATUSES.pending && <Loader />}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalData={modalData}
        />
      )}

      {isLoadMore && <Button handleLoadMore={handleLoadMore} />}
    </div>
  );
};
