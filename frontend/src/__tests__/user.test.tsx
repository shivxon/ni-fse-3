import React from 'react';
import { fireEvent, render, screen,  waitFor } from '@testing-library/react'
import CreateUser from '../components/user/create-user'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';



jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const mockStore = configureStore([]);

test('Validating the current component is create user component', () => {
    const store = mockStore({});
    const { getByText } = render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
    const linkElement = getByText(/add user/i);
    expect(linkElement).toBeInTheDocument();
})

test('Validating required condition of input name "First Name" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);

    const inputElement: any = screen.getByRole('button');
    fireEvent.click(inputElement);
    await waitFor(() => {
        const linkElement: any = screen.getByText('First name is required');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('First name is required');
    });
})


test('Validating required condition of input name "Last Nameame" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);

    const inputElement: any = screen.getByRole('button');
    fireEvent.click(inputElement);
    await waitFor(() => {
        const linkElement: any = screen.getByText('Last name is required');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('Last name is required');
    });
})

test('Validating required condition of input name "Phone" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);

    const inputElement: any = screen.getByRole('button');
    fireEvent.click(inputElement);
    await waitFor(() => {
        const linkElement: any = screen.getByText('Phone is required');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('Phone is required');
    });
})


test('Validating min 3 character condition of input name "First Name" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
    const inputElementButton: any = screen.getByRole('button');
    fireEvent.click(inputElementButton);
    await waitFor(() => {
        const inputElement: any = screen.getByPlaceholderText('Enter First Name');
        fireEvent.change(inputElement , { target: { value: 'ae' }});
    });

    const inputElementButton2: any = screen.getByRole('button');
    fireEvent.click(inputElementButton2);

    await waitFor(() => {
        const linkElement: any = screen.getByText('First name must be at least 3 characters');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('First name must be at least 3 characters');
    });
})


test('Validating min 3 character condition of input name "Last Name" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
    const inputElementButton: any = screen.getByRole('button');
    fireEvent.click(inputElementButton);
    await waitFor(() => {
        const inputElement: any = screen.getByPlaceholderText('Enter Last Name');
        fireEvent.change(inputElement , { target: { value: 'ae' }});
    });

    const inputElementButton2: any = screen.getByRole('button');
    fireEvent.click(inputElementButton2);

    await waitFor(() => {
        const linkElement: any = screen.getByText('Last name must be at least 3 characters');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('Last name must be at least 3 characters');
    });
})


test('Validating min 10 digits condition of input name "Phone" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
    const inputElementButton: any = screen.getByRole('button');
    fireEvent.click(inputElementButton);
    await waitFor(() => {
        const inputElement: any = screen.getByPlaceholderText('Enter Phone');
        fireEvent.change(inputElement , { target: { value: 123 }});
    });

    const inputElementButton2: any = screen.getByRole('button');
    fireEvent.click(inputElementButton2);

    await waitFor(() => {
        const linkElement: any = screen.getByText('Phone must be at least 10 digits');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('Phone must be at least 10 digits');
    });
})

test('Validating max 10 digits condition of input name "Phone" in user form', async () => {
    const store = mockStore({});
    render(<Provider store={store}><Router> <CreateUser /> </Router></Provider>);
    const inputElementButton: any = screen.getByRole('button');
    fireEvent.click(inputElementButton);
    await waitFor(() => {
        const inputElement: any = screen.getByPlaceholderText('Enter Phone');
        fireEvent.change(inputElement , { target: { value: 12345678901 }});
    });

    const inputElementButton2: any = screen.getByRole('button');
    fireEvent.click(inputElementButton2);

    await waitFor(() => {
        const linkElement: any = screen.getByText('Phone must not exceed 10 digits');
        // console.log('linkElement', linkElement.innerHTML)
        expect(linkElement.innerHTML).toBe('Phone must not exceed 10 digits');
    });
})

