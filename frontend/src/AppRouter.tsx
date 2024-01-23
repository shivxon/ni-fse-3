import React from 'react';
import './App.css';
import {Routes, Route,} from "react-router-dom";
import NoPage from './utils/Nopage';
import CreateUser from './components/user/create-user';
import UserList from './components/user/user-list';
import UserDetails from './components/user/user-details';
import EditUser from './components/user/edit-user';


function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<CreateUser />}></Route>
      <Route path='/list' element={<UserList />}></Route>
      <Route path='/details' element={<UserDetails />}></Route>
      <Route path='/edit' element={<EditUser />}></Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default AppRouter;