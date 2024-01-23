import './App.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { store } from './store/store';
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from './AppRouter';


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppRouter />
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
