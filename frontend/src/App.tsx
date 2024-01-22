import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";
import NoPage from './utils/Nopage';
import CreateUser from './components/user/add-user';
import UserList from './components/user/user-list';
import { store } from './store/store';
import { Provider } from 'react-redux'
import UserDetails from './components/user/user-details';


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
            <Route path='/details/:id' element={<UserDetails />}></Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
        </Provider>
    </>
  );
}

export default App;
