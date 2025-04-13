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
        I'm baby tousled cliche raclette, artisan four dollar toast tumeric
        bitters. 8-bit you probably haven't heard of them vaporware, artisan
        fingerstache plaid. Tumeric four dollar toast biodiesel, mixtape
        tacos whatever synth. 3 wolf moon freegan selfies, artisan
        fingerstache plaid. Tumeric four dollar toast biodiesel, mixtape
        tacos whatever synth. 3 wolf moon freegan selfies, artisan
        fingerstache plaid.
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