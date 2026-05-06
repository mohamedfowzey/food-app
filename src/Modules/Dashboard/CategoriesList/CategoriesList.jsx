import { useEffect, useState } from "react";
import Header from "../../Shared/Header/Header";
import headerBoy from "../../../assets/headerBoy.svg";
import { API } from "../../../Constants/axiosClient";
import MainButton from "../../Shared/MainButton/MainButton";
import ConfimationModal from "../../Shared/confimationModal/confimationModal";
import CategoriesDataModal from "../../Shared/CategoriesDataModal/CategoriesDataModal";
import { useForm } from "react-hook-form";
import { Button, Modal } from "react-bootstrap";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import EditCategoryModal from "../../Shared/EditCategoryModal/EditCategoryModal";

export default function Categorieslist() {
  const [categories, setCategories] = useState([]);
  const [deletingId, setDeletingId] = useState("");
  const [adding, setAdding] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [addModalShow, setAddModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [idToEdit,setIdToEdit] = useState('');
  const [nameToEdit,setNameToEdit] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onAdd = async (data) => {
    setAddModalShow(false);
    setAdding(true);
    try{
      await API.post("/Category", data);
      getcategories();
    }catch(e){
    toast.error(e.response?.data?.message || "somthing wrong happened");
    }
    setAdding(false);
  };
  const onDelete = () => {
    setDeletingId(selectedCategory?.id);
    setModalShow(false);

    API.delete(`/Category/${selectedCategory?.id}`)
      .then(() => {
        getcategories();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      })
      .finally(() => {
        setDeletingId("");
      });
  };
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
          <div onClick={() => setAddModalShow(true)} className="d-inline-block">
            {adding ? (
              <LoadingElement />
            ) : (
              <MainButton width="auto">Add Category</MainButton>
            )}
          </div>
        </div>
      </div>
      {categories.length === 0 ? (
        <NoData />
      ) : (
        <div className="table-responsive">
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
                    {deletingId === category.id ? (
                      <LoadingElement color="text-danger" />
                    ) : (
                      <i
                        className="fa fa-trash text-danger cursor-pointer"
                        onClick={() => {
                          setSelectedCategory(category);
                          setModalShow(true);
                        }}
                      ></i>
                    )}
                    <i
                      className="fa fa-edit text-warning cursor-pointer ms-3"
                      onClick={() => {
                        setIdToEdit(category.id);
                        setNameToEdit(category.name)
                        setEditModalShow(true)
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ConfimationModal
        type={"category"}
        show={modalShow}
        onHide={() => setModalShow(false)}
        ondelete={onDelete}
      />
      <CategoriesDataModal
        onsubmit={handleSubmit(onAdd)}
        register={register}
        errors={errors}
        show={addModalShow}
        onhide={() => setAddModalShow(false)}
      />
      <EditCategoryModal 
      onhide={()=>setEditModalShow(false)}
      show={editModalShow}
      categoryId={idToEdit}
      categoryName={nameToEdit}
      changeName={setNameToEdit}
      refresh={getcategories}
      />
    </>
  );
}
