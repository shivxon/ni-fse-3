import React from 'react';
import { render, screen } from '@testing-library/react'
import CreateUser from './components/user/create-user'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

test('Check the Input Validations', () => {
  const store = mockStore({});
  console.log('store', store)
  const { getByText } = render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
  const linkElement = getByText(/add user/i);
  expect(linkElement).toBeInTheDocument();
  // expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

})