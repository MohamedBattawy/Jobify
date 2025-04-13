import React from 'react';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
        email: "test@test.com",
        password: "secret123",
    };
    try{
        await customFetch.post('/auth/login', data);
        toast.success('Take a test drive');
        navigate('/dashboard');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
}

  return (
    <Wrapper>
      <Form className='form' method="post">
        <Logo/>
        <h4>Login</h4>
        <FormRow type='email' name='email'/>
        <FormRow type='password' name='password'/>
        <SubmitBtn formBtn/>
        <button type='submit' className='btn btn-block' onClick={loginDemoUser}>explore the app</button>
        <p>
          Not a Member? <Link to='/register'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login