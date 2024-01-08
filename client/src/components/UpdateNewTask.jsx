import { Form, Link } from 'react-router-dom';
import Modal from './Modal';
import FormRow from './FormRow';
import Wrapper from '../assets/wrappers/CreateNewTaskModel';
import { RxCross1 } from 'react-icons/rx';
import SubmitBtn from './SubmitBtn';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigationContext } from '../pages/NavigationBar';
import { useState } from 'react';

const UpdateNewTask = ({
  onClose,
  title,
  taskName = '',
  dueDate = '',
  status = 'pending',
  id,
  closeModal,
}) => {
  const { queryClient } = useNavigationContext();
  const [isEditing, setIsEditing] = useState(false);

  const editTaskHandler = async (e) => {
    e.preventDefault();
    setIsEditing(true);

    const data = {
      taskName: e.target.taskName.value,
      dueDate: e.target.dueDate.value,
      status,
    };

    try {
      await customFetch.patch(`/task/${id}`, data);
      setIsEditing(false);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Task Updated Successfully!');
      return closeModal();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setIsEditing(false);
      return error;
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <Wrapper>
        <div className='header'>
          <h3>{title}</h3>
          <Link onClick={onClose}>
            <RxCross1 />
          </Link>
        </div>

        <form method='post' className='form' onSubmit={editTaskHandler}>
          <FormRow name='taskName' type='text' defaultValue={taskName} />
          <FormRow
            name='dueDate'
            labelText='Dead-line'
            type='date'
            defaultValue={dueDate}
          />
          <button className='btn form-btn btn-block' type='submit'>
            {isEditing ? 'Updating...' : 'Update'}
          </button>
        </form>
      </Wrapper>
    </Modal>
  );
};
export default UpdateNewTask;
