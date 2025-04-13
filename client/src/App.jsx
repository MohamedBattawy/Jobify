import React from 'react';
import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Stats
} from './pages';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Register from './pages/Register';

import { action as AddJobAction } from './pages/AddJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { action as editJobAction } from './pages/EditJob';
import { action as LoginAction } from './pages/Login';
import { action as ProfileAction } from './pages/Profile';
import { action as RegisterAction } from './pages/Register';


import { loader as adminloader } from './pages/Admin';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as DashboardLoader } from './pages/DashboardLayout';
import { loader as editJobLoader } from './pages/EditJob';
import { loader as statsLoader } from './pages/Stats';



export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error/>,
    children: [
      {
        index:true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: RegisterAction,
      },
      {
    
        path: 'login',
        element: <Login />,
        action: LoginAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled = {checkDefaultTheme} />,
        loader: DashboardLoader,
        children: [
          {
            index:true,
            element: <AddJob />,
            action: AddJobAction,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: ProfileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminloader,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          }
        ]
      }
    ]
  },


]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App