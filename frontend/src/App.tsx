import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";
import NoPage from './utils/Nopage';
import CreateUser from './components/user/add-user';
import UserList from './components/user/user-list';
import { store } from './store/store';
import { Provider } from 'react-redux'
import UserDetails from './components/user/user-details';
import EditUser from './components/user/edit-user';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// const checkAuth = (userType: any) => {
//   return isLoggedIn(userType);
// }


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CreateUser />}></Route>
            <Route path='/list' element={<UserList />}></Route>
            <Route path='/details' element={<UserDetails />}></Route>
            <Route path='/edit' element={<EditUser />}></Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
