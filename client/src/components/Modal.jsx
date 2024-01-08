import { createPortal } from 'react-dom';

const Modal = ({ children, onClose, title }) => {
  return createPortal(
    <>
      <div className='backdrop' onClick={onClose} />
      <div className='modal'>{children}</div>
    </>,
    document.getElementById('modal')
  );
};
export default Modal;
