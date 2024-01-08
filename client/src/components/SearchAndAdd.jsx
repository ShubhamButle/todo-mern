import { Form, Link, useSubmit } from 'react-router-dom';
import Wrapper from '../assets/wrappers/searchContainer';
import Modal from './Modal';
import CreateNewTask from './CreateNewTask';
import { useState } from 'react';

const SearchAndAdd = () => {
  const [isNewTask, setIsNewtask] = useState(false);

  const taskCloseHandler = () => {
    setIsNewtask(!isNewTask);
  };

  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <>
      <Wrapper>
        <Form className='form'>
          <div className='form-row'>
            <input
              className='form-input'
              type='text'
              name='search'
              placeholder='Search'
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <Link to='/dashboard/' className='btn '>
              Reset
            </Link>
          </div>
        </Form>
        <button className='btn' onClick={taskCloseHandler}>
          Add New Task
        </button>
      </Wrapper>

      {isNewTask && (
        <CreateNewTask title='Add New Task' onClose={taskCloseHandler} />
      )}
    </>
  );
};
export default SearchAndAdd;
