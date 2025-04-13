import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
    </nav>
    <div className='container page'>
      <div className='info'>

      <h1>job <span> tracking </span> app </h1>

      <p>
  Jobify helps you stay organized and in control of your job search. Track job applications, monitor your progress, and never miss a follow-up again. Whether you're actively applying or just browsing, keep all your opportunities in one place.
</p>


      <Link to='/register' className='btn register-link'>Register</Link>
      <Link to='/login' className='btn'>Login/Demo User</Link>
      </div>
      <img src ={main} alt="job hunt" className='img main-img'/>
    </div>

    </Wrapper>
  )
}

export default Landing