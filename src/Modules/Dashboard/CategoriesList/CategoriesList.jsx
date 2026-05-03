import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headerBoy from "../../../assets/headerBoy.svg";
import { API } from "../../../Constants/axiosClient";
import MainButton from "../../Shared/MainButton/MainButton";
import ConfimationModal from "../../Shared/confimationModal/confimationModal";
import CategoriesDataModal from "../../Shared/CategoriesDataModal/CategoriesDataModal";
import {  useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";

export default function Categorieslist() {
  const [categories, setCategories] = useState([]);
  const [deletingId, setDeletingId] = useState('');
  const [adding, setAdding] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {register,handleSubmit,formState:{errors}} = useForm();
    const onsubmit = (data) => {
      setAdding(true);
      API.post('/Category',data).then(()=>{getcategories()}).catch((err)=>{toast.error(err.response?.data?.message)}).finally(()=>{setAdding(false)});
      setAddModalShow(false)
    
  }
  const onDelete = () => {
    setDeletingId(selectedCategory?.id);
            setModalShow(false);

          API.delete(`/Category/${selectedCategory?.id}`).then(() => {
            getcategories();

          }).catch((err) => {
            toast.error(err.response?.data?.message);
          }).finally(() => {  
        setDeletingId('');
      });
        }
  const getcategories = async () => {
    try {
      const response = await API.get("/category");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (() => {
      getcategories();
    })();
  }, []);

  return (
    <>
      <Header
        title="Categories list"
        description="Manage your categories"
        image={headerBoy}
      />
      <div className="row p-5 justify-content-between align-items-center">
        <div className="col-md-8">
          <h2>Categories</h2>
          <p>Manage your categories here</p>
        </div>
        <div className="col-md-4 text-end">
          <div onClick={()=>setAddModalShow(true)} className="d-inline-block">
            {adding ? <LoadingElement /> :
            <MainButton width="auto">
              Add Category
            </MainButton>}
          </div>
        </div>
      </div>
      {categories.length === 0 ? (
        <NoData/>
      ) : (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">creation date</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <th scope="row">{category.id}</th>
              <td>{category.name}</td>
              <td>{category.creationDate}</td>
              <td className="text-center">
                {deletingId === category.id  ? <LoadingElement color="text-danger"  /> : 
                  <i
                  className="fa fa-trash text-danger cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalShow(true);
                  }}
                ></i>}
                <i 
                  className="fa fa-edit text-warning cursor-pointer ms-3"
                  onClick={() => {}}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <ConfimationModal
      type={'category'}
        show={modalShow}
        onHide={() => setModalShow(false)}
        ondelete={onDelete}
      />
      {/* <CategoriesDataModal
        category={selectedCategoryToEdit}
        refresh={getcategories}
        show={addModalShow}
        onHide={() => setAddModalShow(false)}
      /> */}
   <Modal
      show={addModalShow}
      onHide={() => setAddModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          add new category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input type="text" className='form-control' {...register("name", { required: 'name is required' })} placeholder='Category Name'
          />
          {errors.name && <p className='text-danger'>{errors.name.message}</p>}
          <div className="text-end mt-3 ">
        <MainButton width={'auto'}>Save</MainButton>
        <Button className='ms-2' onClick={() => {setAddModalShow(false);}}>Close</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
    </>
  );
}
