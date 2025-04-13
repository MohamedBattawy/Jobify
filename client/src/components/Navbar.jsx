import { FaAlignLeft } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/Navbar';
import Logo from '../components/Logo';
import ThemeToggle from './ThemeToggle';

import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
        <ThemeToggle />
            <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;