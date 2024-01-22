import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"
import { getUserDetails } from "../../reducers/user-details-reducer";


const UserDetails = ()=>{
 const params = useParams()
 console.log('params',params)
 const dispatch: AppDispatch = useAppDispatch();
 const userDetails: any = useSelector((state: RootState) => state.getUserDetails.details)
 console.log('userDetails', userDetails)
 useEffect(() => {
    dispatch(getUserDetails(params?.id as string))
  }, [dispatch]);

    return (<div>Details Page</div>);
}

export default UserDetails