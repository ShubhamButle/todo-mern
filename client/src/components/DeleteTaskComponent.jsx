import { Form, Link, useNavigation } from 'react-router-dom';
import Modal from './Modal';
import FormRow from './FormRow';
import Wrapper from '../assets/wrappers/DeleteTaskModel';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useNavigationContext } from '../pages/NavigationBar';
import { useState } from 'react';

const deleteTask = async (id, onClose, queryClient, setIsDeleting) => {
  try {
    setIsDeleting(true);
    await customFetch.delete(`/task/${id}`);
    await queryClient.invalidateQueries(['tasks']);
    toast.success('Task Deleted Successfully!');
    return onClose();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  } finally {
    setIsDeleting(false);
  }
};

const DeleteTaskComponent = ({ onClose, title, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { queryClient } = useNavigationContext();

  return (
    <Modal title={title} onClose={onClose}>
      <Wrapper>
        <div className='header'>
          <h4>{title}</h4>
          <Link onClick={onClose}>
            <RxCross1 />
          </Link>
        </div>

        <div className='button-holders'>
          <button className='btn cancel-btn' onClick={onClose}>
            Cancel
          </button>

          <button
            className='btn confirm-btn'
            onClick={() => deleteTask(id, onClose, queryClient, setIsDeleting)}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};

export default DeleteTaskComponent;
