import React from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;