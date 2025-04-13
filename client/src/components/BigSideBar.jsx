import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from '../components/Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavLinks from './NavLinks';

const BigSideBar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();
    return (
      <Wrapper>
        <div
          className={
            showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
          }
        >
          <div className='content'>
            <header>
              <Logo />
            </header>
            <NavLinks isBigSideBar />
          </div>
        </div>
      </Wrapper>
    );
}

export default BigSideBar;