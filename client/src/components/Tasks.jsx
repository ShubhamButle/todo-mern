import { Form, Link } from 'react-router-dom';
import { DeleteTaskComponent } from '.';
import Wrapper from '../assets/wrappers/Tasks';
import Task from './Tasks';
import { useState } from 'react';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import UpdateNewTask from './UpdateNewTask';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useNavigationContext } from '../pages/NavigationBar';
Wrapper;

const Tasks = ({ tasks }) => {
  const { queryClient } = useNavigationContext();
  const { taskName, status, _id, dueDate } = tasks;

  const date = day(dueDate).format('MMM DD, YYYY');
  const editDate = day(dueDate).format('YYYY-MM-DD');

  const [isDeleteEnabled, setDeleteEnabled] = useState(false);
  const [isEditTask, setIsEditTask] = useState(false);

  const deleteTaskHandler = () => {
    setDeleteEnabled((deleteFlag) => !deleteFlag);
  };
  const taskCloseHandler = () => {
    setIsEditTask((editFlag) => !editFlag);
  };

  const statusHandler = async () => {
    const statusToChange = status === 'pending' ? 'completed' : 'pending';

    const data = {
      taskName,
      status: statusToChange,
      dueDate: editDate,
    };

    try {
      await customFetch.patch(`/task/${_id}`, data);
      queryClient.invalidateQueries(['tasks']);
      toast.success('Task status changed');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      <Wrapper>
        <header>
          <div className='main-icon'>{'B'}</div>
          <div className='info'>
            <p>{taskName}</p>
          </div>
        </header>
        <div className='contentTask'>
          <div className='content-center'>
            <div className={`status ${status}`}>{status}</div>
            <div className={'dateStyle'}>{date}</div>
          </div>

          <footer className='actions'>
            <button className='btn' onClick={taskCloseHandler}>
              Edit
            </button>
            <button
              type='submit'
              className='btn delete-btn'
              onClick={deleteTaskHandler}
            >
              Delete
            </button>

            <button
              type='submit'
              className='btn done-btn'
              onClick={statusHandler}
            >
              {status === 'pending' ? 'Mark Done' : 'Mark Pending'}
            </button>
          </footer>
        </div>
      </Wrapper>
      {/* Models */}
      {/* Delete */}
      {isDeleteEnabled && (
        <DeleteTaskComponent
          onClose={deleteTaskHandler}
          title='Do you really want to Delete Task?'
          id={_id}
        />
      )}
      {/* Edit  */}
      {isEditTask && (
        <UpdateNewTask
          title='Edit New Task'
          onClose={taskCloseHandler}
          taskName={taskName}
          dueDate={editDate}
          id={_id}
          status={status}
          closeModal={taskCloseHandler}
        />
      )}
    </>
  );
};
export default Tasks;
