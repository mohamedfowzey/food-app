import React, { useEffect, useState } from "react";
import headerBoy from "../../../assets/headerBoy.svg";
import Header from "../../Shared/Header/Header";
import { API } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";
import NoData from "../../Shared/NoData/NoData";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import ConfimationModal from "../../Shared/confimationModal/confimationModal";
export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [showModal, setShowMoadal] = useState(false);
  const getUsers = async () => {
    try{
    const response = await API.get("/users?pageSize=10&pageNumber=1");
    
    setUsers(response.data.data);
    }
    catch(e){
      toast.error(e.response.data.message)
    }
    
  };
  const onDelete = async () => {
    setDeletingId(idToDelete);
    setShowMoadal(false)
    try{
     const response = await API.delete(`users/${idToDelete}`);
      getUsers()
      
      toast.success(response.data.message);
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
      
    }
    setDeletingId("");
  };
  useEffect(() => {
    (() => {
      getUsers()
    })();
  }, []);
  return (
    <>
      <Header
        image={headerBoy}
        title={`Users List`}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div>
        <h2>Users Table Details</h2>
        <p>you can check all details</p>
      </div>
      {users.length === 0 ? (
        <NoData />
      ) : (
      <div className='table-responsive-md'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">user name</th>
              <th scope="col">phone number</th>
              <th scope="col">email</th>
              <th scope="col">role</th>
              
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.group.name}</td>
                <td className="text-center">
                  {deletingId === user.id ? (
                    <LoadingElement color="text-danger" />
                  ) : (
                    <i
                      className="fa fa-trash text-danger cursor-pointer"
                      onClick={() => {
                        setShowMoadal(true);
                        setIdToDelete(user.id);
                      }}
                    ></i>
                  )}
                  <i
                    className="fa fa-edit text-warning cursor-pointer ms-3"
                    onClick={() => {}}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <ConfimationModal
        type={"user"}
        show={showModal}
        onHide={() => setShowMoadal(false)}
        ondelete={onDelete}
      />
    </>
  );
}
