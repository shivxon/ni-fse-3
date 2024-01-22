import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import PaginationControl from "../../utils/Pagination/Pagination";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../store/store"
import { getUserList } from "../../reducers/user-list-reducer";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';





const UserList = () => {
  let active = 2;
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',

    }}>
      <Card style={{ width: '100rem', height: '40rem', padding: '40px' }}>
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
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.phone}</td>
                    <td style={{ display: 'flex', justifyContent: 'center' }} ><Button style={{ marginRight: '10px' }} variant="primary" type="button" onClick={() => handleNavigate(item?._id)}>
                      View
                    </Button>
                      <Button variant="secondary" type="button" onClick={() => handleNavigate(item?._id)}>
                        Edit
                      </Button></td>
                  </tr>
                )) :
                  <tr>
                    <td><p>No Data found.</p></td>
                  </tr>
                }
              </tbody>
            </table>

            <div style={{display:'flex',justifyContent:'center'}}>
              <PaginationControl page={page} setPage={setPage} totalPages={userList?.data?.length > 0 ? ((userList?.count - 1) / itemsPerPage + 1) : 0} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserList