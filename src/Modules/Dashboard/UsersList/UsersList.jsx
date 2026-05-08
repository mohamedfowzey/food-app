import React, { useContext, useEffect, useState } from "react";
import headerBoy from "../../../assets/headerBoy.svg";
import Header from "../../Shared/Header/Header";
import { API, BASE_URL } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";
import { Pagination } from "react-bootstrap";
import NoData from "../../Shared/NoData/NoData";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import onfirmationModal from "../../Shared/onfirmationModal/onfirmationModal";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import { useForm } from "react-hook-form";
import MainButton from "../../Shared/MainButton/MainButton";
import sadGirl from "../../../assets/sadGirl.svg"
export default function UsersList() {
  const [active, setActive] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { mood } = useContext(ContextFounder);
  const [users, setUsers] = useState([]);
  const [paginationView,setPaginationView] = useState(1)
  const [idToDelete, setIdToDelete] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [showModal, setShowMoadal] = useState(false);
  const [emailToSearch,setEmailToSearch] = useState('');
  const [nameToSearch,setNameToSearch] = useState('');
  const [counteryToSearch,setCounteryToSearch] = useState('');
  const [roleToSearch,setroleToSearch] = useState(0);
  const {register,handleSubmit} = useForm()
  const onSearch = (data)=>{
        setActive(1)

    setEmailToSearch(data?.email)
    setNameToSearch(data?.userName)
    setCounteryToSearch(data?.countery)
    setroleToSearch(data?.role)
    
  }
  const NumberToArray = (number) => {
    const result = [];
    for (let i = number; i <= (totalPages<5?totalPages:(number+4)); i++) {
      result.push(i);
    }
    return result;
  };
  const getUsers = async () => {
    let queryString = '';
    queryString += emailToSearch ? `&email=${emailToSearch}`: '';
    queryString += nameToSearch ? `&userName=${nameToSearch}`: '';
    queryString += counteryToSearch ? `&country=${counteryToSearch}`: '';
    queryString += +roleToSearch ? `&groups=${roleToSearch}`: '';
    try {
      const response = await API.get(`/users?pageSize=5&pageNumber=${active}${queryString}`);

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
    (()=>{

      getUsers();
    })()
    
  }, [active,emailToSearch,nameToSearch,counteryToSearch,roleToSearch]);
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
      <form className="d-flex gap-1 flex-nowrap " onSubmit={handleSubmit(onSearch)}>
        <div className="mb-3">
        <input {...register('userName')} type="text" className="form-control flex-grow-1" placeholder="userName" />
          
        </div>
        <div className="mb-3">
        <input {...register('email')} type="text" className="form-control" placeholder="email" />

        </div>
        <div className="mb-3">
        <input {...register('countery')} type="text" className="form-control" placeholder="countery" />

        </div>
        <div className="mb-3">
        <select {...register('role')} className="form-control " placeholder="userRole" >
            <option value="0">role</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
        </select>

        </div>
        <div className="mb-3">

        <MainButton><i className="fa fa-search"></i></MainButton>
        </div>
        
      </form>
      {users.length === 0 ? (
        <NoData />
      ) : (
        <div className="table-responsive hide-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">image</th>
                <th scope="col">user name</th>
                <th scope="col">phone number</th>
                <th scope="col">email</th>
                <th scope="col">country</th>
                <th scope="col">role</th>

                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <th >
                    <img width={100} src={user?.imagePath?`${BASE_URL}/${user?.imagePath}`:sadGirl} alt="user image" />
                  </th>
                  <td>{user.userName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
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
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination className={`${mood} w-100 overflow-scroll hide-scrollbar`}>
        {totalPages>5?<>
      <Pagination.Prev onClick={()=>setPaginationView(p=>p>1?(p-5):p)}/>
      <Pagination.Ellipsis /></>:<></>}
      {NumberToArray(paginationView).map((n) => (
          <Pagination.Item
            key={n}
            active={n === active}
            onClick={() => {
              setActive(n);
            }}
          >
            {n}
          </Pagination.Item>
        ))}
      {totalPages>5?<>
      <Pagination.Ellipsis ></Pagination.Ellipsis>
      <Pagination.Next onClick={()=>setPaginationView(p=>(p+5)<totalPages?(p+5):p)}/>
      <Pagination.Item active={totalPages === active}
            onClick={() => {
              setActive(totalPages);
            }}>{totalPages}</Pagination.Item>
            </>:<></>}
    </Pagination>
     
      <onfirmationModal
        type={"user"}
        show={showModal}
        onHide={() => setShowMoadal(false)}
        action={onDelete}
      />
    </>
  );
}
