import Wrapper from '../assets/wrappers/LoginAndRegister';
import { FormRow, Logo } from '../components';
import { Form, Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import SubmitBtn from '../components/SubmitBtn';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successful');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h5>Register</h5>
        <FormRow type='text' name='name' defaultValue='shubham' />
        <FormRow type='email' name='email' defaultValue='shubh@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <SubmitBtn formBtn />
        <p>
          Not a member yet?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
