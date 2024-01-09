import { Component } from 'react';
import css from '../Styles/styles.module.css';
import { requestImagesByQuery } from './Services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from '../Helpers/statuses';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    status: STATUSES.idle,
    query: '',
    error: null,
    isLoadMore: false,
    isOpenModal: false,
    modalData: [],
    page: 1,
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      try {
        this.setState({ status: STATUSES.pending });
        const { hits, totalHits } = await requestImagesByQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoadMore: this.state.page < Math.ceil(totalHits / 12),
          status: STATUSES.success,
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      }
    }
  }

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = (largeImageURl, tags) => {
    this.setState({
      modalData: { largeImageURl, tags },
      isOpenModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  render() {
    const { isLoadMore, isOpenModal, status } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleOpenModal}
        />
        {status === STATUSES.pending && <Loader />}
        {isOpenModal && (
          <Modal
            isOpenModal={isOpenModal}
            onCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}

        {isLoadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
