import React from 'react';
import { render, screen } from '@testing-library/react'
import CreateUser from '../components/user/add-user'


test('Check the Input Validations',()=>{
    render(<CreateUser />)

    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();

})