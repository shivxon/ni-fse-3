import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"

import Card from 'react-bootstrap/Card';

const UserDetails = () => {
 
  const userDetails: any = useSelector((state: RootState) => state.getUserDetails.details)
  console.log('userDetails', userDetails.data)

  return (<div style={{
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px',

  }}>
    <Card style={{ width: '40rem', height: '25rem', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}> <h4>User Details</h4> </div>
      <div >
        <ul>
          <li style={{ display: 'flex', justifyContent: 'flex-start' }}><span>First Name :</span>
            <p style={{ marginLeft: '10px' }}>
              {userDetails?.data?.firstName}
            </p>
          </li>
          <li style={{ display: 'flex', justifyContent: 'flex-start' }}><span>Last Name :</span>
            <p style={{ marginLeft: '10px' }}>
              {userDetails?.data?.lastName}
            </p>
          </li>
          <li style={{ display: 'flex', justifyContent: 'flex-start' }}><span>Phone Number :</span>
            <p style={{ marginLeft: '10px' }}>
              {userDetails?.data?.phone}
            </p>
          </li>
        </ul>
      </div>
    </Card>
  </div>);
}

export default UserDetails