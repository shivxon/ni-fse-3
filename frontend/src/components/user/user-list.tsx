import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import Pagination from "../../utils/Pagination/Pagination";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"
import { getUserList } from "../../reducers/user-list-reducer";





const UserList = () => {
  const itemsPerPage = 5
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate()

  const dispatch: AppDispatch = useAppDispatch();
  const userList: any = useSelector((state: RootState) => state.userList.list)
  console.log('userList', userList)

  useEffect(() => {
    dispatch(getUserList({ page, limit: itemsPerPage }))
  }, [dispatch, page]);


  const handleNavigate = (id: string) => {
    console.log('id', id)
    navigate(`/details/${id}`)
  }

  return (
    <div className="tableList">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Sr.no.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList && userList?.data?.length > 0 ? userList?.data?.map((item: any, i: any) => (
              <tr>
                <td>{i + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phone}</td>
                <td onClick={()=>handleNavigate(item?._id)} >{'VIEW DETAILS'}</td>
              </tr>
            )) :
              <tr>
                <td><p>No Data found.</p></td>
              </tr>
            }
          </tbody>
        </table>
        <Pagination page={page} setPage={setPage} totalPages={userList?.data?.length > 0 ? ((userList?.count - 1) / itemsPerPage + 1) : 0} />
      </div>
    </div>
  )
}

export default UserList