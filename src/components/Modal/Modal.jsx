import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.onClickESC);
  }
  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.onClickESC);
  }
  onClickESC = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURl, tags } = this.props.modalData;
    return (
      <div className={css.Overlay} onClick={this.handleCloseModal}>
        <div className={css.Modal}>
          <img src={largeImageURl} alt={tags} width="900" height="900" />
        </div>
      </div>
    );
  }
}
