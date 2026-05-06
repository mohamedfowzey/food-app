import React, { useContext, useEffect, useState } from "react";
import headerBoy from "../../../assets/headerBoy.svg";
import Header from "../../Shared/Header/Header";
import { API } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";
import NoData from "../../Shared/NoData/NoData";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import ConfimationModal from "../../Shared/confimationModal/confimationModal";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
export default function UsersList() {
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { mood } = useContext(ContextFounder);
  const [users, setUsers] = useState([]);
  const [paginationView,setPaginationView] = useState(1)
  const [idToDelete, setIdToDelete] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [showModal, setShowMoadal] = useState(false);
  const NumberToArray = (number) => {
    const result = [];
    for (let i = number; i <= (number+4); i++) {
      result.push(i);
    }
    return result;
  };
  const getUsers = async (n) => {
    try {
      const response = await API.get(`/users?pageSize=5&pageNumber=${n}`);

      setUsers(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  const onDelete = async () => {
    setDeletingId(idToDelete);
    setShowMoadal(false);
    try {
      const response = await API.delete(`users/${idToDelete}`);
      getUsers();

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setDeletingId("");
  };
  useEffect(() => {
    (() => {
      getUsers();
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
        <div className="table-responsive">
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
      <Pagination className={`${mood} w-100 overflow-scroll`}>
      <Pagination.Prev onClick={()=>setPaginationView(p=>p>1?(p-5):p)}/>
      <Pagination.Ellipsis />
      {NumberToArray(paginationView).map((n) => (
          <Pagination.Item
            key={n}
            active={n === active}
            onClick={() => {
              setActive(n);
              getUsers(n);
            }}
          >
            {n}
          </Pagination.Item>
        ))}

      <Pagination.Ellipsis ></Pagination.Ellipsis>
      <Pagination.Next onClick={()=>setPaginationView(p=>(p+5)<totalPages?(p+5):p)}/>
      <Pagination.Item active={totalPages === active}
            onClick={() => {
              setActive(totalPages);
              getUsers(totalPages);
            }}>{totalPages}</Pagination.Item>
    </Pagination>
      {/* <Pagination className={`${mood}`}>
        {NumberToArray(totalPages).map((n) => (
          <Pagination.Item
            key={n}
            active={n === active}
            onClick={() => {
              setActive(n);
              getUsers(n);
            }}
          >
            {n}
          </Pagination.Item>
        ))}
      </Pagination> */}
      <ConfimationModal
        type={"user"}
        show={showModal}
        onHide={() => setShowMoadal(false)}
        ondelete={onDelete}
      />
    </>
  );
}
