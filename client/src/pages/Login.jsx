import Wrapper from '../assets/wrappers/LoginAndRegister';
import { FormRow, Logo } from '../components';
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import SubmitBtn from '../components/SubmitBtn';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login Successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h5>login</h5>
        <FormRow type='email' name='email' defaultValue='test.test@gmail.com' />
        <FormRow type='password' name='password' defaultValue='secret123' />
        <SubmitBtn formBtn />

        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
