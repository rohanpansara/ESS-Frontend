import React, { useState } from 'react';
import '../styles/modal.css';

const Modal = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <div className='body'>
    <section className="modal container">
      <button className="modal__button" onClick={showModal}>
        Open Modal
      </button>

      <div className={`modal__container ${show ? 'show-modal' : ''}`}>
        <div className="modal__content">
          <div className="modal__close close-modal" title="Close" onClick={closeModal}>
            <i className='bx bx-x'></i>
          </div>

          

          <h1 className="modal__title">Good Job!</h1>
          <p className="modal__description">Click the button to close</p>

          <button className="modal__button modal__button-width">
            View status
          </button>

          <button className="modal__button-link close-modal" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Modal;
