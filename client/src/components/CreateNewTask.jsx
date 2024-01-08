import { Form, Link } from 'react-router-dom';
import Modal from './Modal';
import FormRow from './FormRow';
import Wrapper from '../assets/wrappers/CreateNewTaskModel';
import { RxCross1 } from 'react-icons/rx';
import SubmitBtn from './SubmitBtn';

const CreateNewTask = ({ onClose, title, taskName = '', dueDate = '' }) => {
  return (
    <Modal title={title} onClose={onClose}>
      <Wrapper>
        <div className='header'>
          <h3>{title}</h3>
          <Link onClick={onClose}>
            <RxCross1 />
          </Link>
        </div>

        <Form method='post' className='form'>
          <FormRow name='taskName' type='text' defaultValue={taskName} />
          <FormRow
            name='dueDate'
            labelText='Dead-line'
            type='date'
            defaultValue={dueDate}
          />
          {/* <button className='btn form-btn btn-block' type='submit'>
            submit
          </button> */}
          <SubmitBtn />
        </Form>
      </Wrapper>
    </Modal>
  );
};
export default CreateNewTask;
