import React, { useContext, useEffect, useState } from "react";
import headerBoy from "../../../assets/headerBoy.svg";
import Header from "../../Shared/Header/Header";
import { useNavigate } from "react-router-dom";
import MainButton from "../../Shared/MainButton/MainButton";
import { API, BASE_URL } from "../../../Constants/axiosClient";
import { toast } from "react-toastify";
import NoData from "../../Shared/NoData/NoData";
import ConfimationModal from "../../Shared/confimationModal/confimationModal";
import LoadingElement from "../../Shared/LoadingElement/LoadingElement";
import sadGirl from "../../../assets/sadGirl.svg";
import { Modal, Pagination } from "react-bootstrap";
import { ContextFounder } from "../../../contexts/UserConrtrxt";
import OnlyAdmins from "../../Shared/Prtected/OnlyAdmins";
import OnlyUsers from "../../Shared/Prtected/OnlyUsers";
import UserRecipeDataModal from "../../Shared/UserRecipeDataModal/UserRecipeDataModal";
import { useForm } from "react-hook-form";
export default function RecipesList() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [paginationView,setPaginationView] = useState(1)
  
  const [categories,setCategories] = useState([])
  const [tags,setTags] = useState([])
  const [deletingId, setDeletingId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [userModalShow, setUserModalShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedUserRecipe, setSelectedUserRecipe] = useState(null);
  const [active, setActive] = useState(1);
  const { mood } = useContext(ContextFounder);
  const [nameToSearch,setNameToSearch] = useState('')
  const [tagToSearch,setTagToSearch] = useState(0)
  const [categoryToSearch,setCategoryToSearch] = useState(0);
  const {register,handleSubmit} = useForm();
  const onSearch = (data)=>{
    setCategoryToSearch(data?.categoryId)
    setTagToSearch(data?.tagId)
    setNameToSearch(data?.name)
    
  }
  const onDelete = () => {
    setDeletingId(selectedRecipe?.id);
    setModalShow(false);
    API.delete(`/Recipe/${selectedRecipe?.id}`)
      .then(() => {
        toast("recipe deleted");
        getRecipes();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      })
      .finally(() => {
        setDeletingId("");
      });
  };
  const getRecipes = async () => {
    let queryString = '';
    queryString += nameToSearch ? `&name=${nameToSearch}`: '';
    queryString += categoryToSearch ? `&categoryId=${categoryToSearch}`: '';
    queryString += +tagToSearch ? `&tagId=${tagToSearch}`: '';
    try {
      const response = await API.get(`/recipe?pageSize=5&pageNumber=${active}${queryString}`);
      setRecipes(response.data.data);
            setTotalPages(response.data.totalNumberOfPages);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const addToFavorites = async (id) => {
    console.log(id);
    
    setUserModalShow(false);
    try {
      await API.post("/userRecipe", { 'recipeId': +id });
      toast.success("recipe added to favories successfully");
    } catch (error) {
      toast.error(error.response.data.message || "something wrong happend");
    }
  };
  const removeDuplicateByName=(dataList)=>{
    if(!dataList) return;
    const hashMap = {};
    dataList.forEach(item => {
      hashMap[item.name] = item
    });
    return Object.values(hashMap);
  }
  const NumberToArray = (number) => {
    const result = [];
    for (let i = number; i <= (totalPages<5?totalPages:(number+4)); i++) {
      result.push(i);
    }
    return result;
  };
   const getCategories = async (total = 5, times = 0) => {
      const response = await API.get(`/Category?pageSize=${total}&pageNumber=1`);
      total = response.data.totalNumberOfRecords;
      if (times === 0) {
        const finalResponse = await getCategories(total, 1);
        const noneDuplicate = removeDuplicateByName(finalResponse?.data?.data)
        setCategories(noneDuplicate);
      }
      return response;
    };
    const getTags = async () => {
      const response = await API.get("/tag");
      setTags(response.data);
    };
  useEffect(() => {
    (() => {
      getRecipes();
      getCategories()
      getTags()
    })();
  }, [active,nameToSearch,tagToSearch,categoryToSearch]);
  return (
    <>
      <Header
        image={headerBoy}
        title={`Recipes Items`}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
      <div className="row p-5 justify-content-between align-items-center flex-wrap">
        <div className="col-md-8">
          <h2>Recipe Table Details</h2>
          <p>Manage your recipes here</p>
        </div>
        <div className="col-md-4 text-end">
          <div
            onClick={() => navigate("../add-recipe")}
            className="d-inline-block"
          >
            <OnlyAdmins>
              <MainButton width="auto">Add Recipe</MainButton>
            </OnlyAdmins>
          </div>
        </div>
      </div>
      <form className="d-flex gap-1 flex-nowrap " onSubmit={handleSubmit(onSearch)}>
              <div className="mb-3">
              <input {...register('name')} type="text" className="form-control flex-grow-1" placeholder="userName" />
                
              </div>
             
              <div className="mb-3">
              <select {...register('categoryId')} className="form-control " >
                  <option value="0">No Category</option>
                  {categories.map((category)=><option value={category.id}>{category.name}</option>)}
              </select>
      
              </div>
              <div className="mb-3">
              <select {...register('tagId')} className="form-control " >
                  <option value="0">No Tag</option>
                  {tags.map((tag)=><option value={tag.id}>{tag.name}</option>)}
              </select>
      
              </div>
              <div className="mb-3">
      
              <MainButton><i className="fa fa-search"></i></MainButton>
              </div>
              
            </form>
      {recipes.length === 0 ? (
        <NoData />
      ) : (
        <div className="table-responsive hide-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">image</th>
                <th scope="col">description</th>
                <th scope="col">Price</th>
                <th scope="col">category</th>
                <th scope="col">tag</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    <img
                      width={50}
                      src={
                        recipe.imagePath
                          ? `${BASE_URL}/${recipe.imagePath}`
                          : sadGirl
                      }
                      alt="recipe image "
                    />

                    {/* {recipe.imagePath} */}
                  </td>
                  <td>{recipe.description}</td>
                  <td>{recipe.price}</td>
                  <td>{recipe.category[0].name}</td>
                  <td>{recipe.tag.name}</td>
                  <td className="text-center">
                    <OnlyAdmins>
                      {deletingId === recipe.id ? (
                        <LoadingElement color="text-danger" />
                      ) : (
                        <i
                          className="fa fa-trash text-danger cursor-pointer"
                          onClick={() => {
                            setSelectedRecipe(recipe);
                            setModalShow(true);
                          }}
                        ></i>
                      )}
                      <i
                        className="fa fa-edit text-warning cursor-pointer ms-3"
                        onClick={() => {
                          navigate("../add-recipe", {
                            state: { id: recipe.id },
                          });
                        }}
                      ></i>
                    </OnlyAdmins>
                    <OnlyUsers>
                      <div className="dropdown">
                        <span
                          className="fs-5 text-accent"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis" />
                        </span>
                        <ul className={`dropdown-menu ${mood}`}>
                          <li>
                            <a
                              onClick={() => {
                                setUserModalShow(true);
                                setSelectedUserRecipe(recipe);
                              }}
                              className="dropdown-item cursor-pointer"
                            >
                              <i className="fa fa-eye text-accent"></i> view
                            </a>
                          </li>
                        </ul>
                      </div>
                    </OnlyUsers>
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

      <ConfimationModal
        type={"recipe"}
        show={modalShow}
        onHide={() => setModalShow(false)}
        action={onDelete}
      />
      {/* <UserRecipeDataModal
        showModal={userModalShow}
        onhide={() => setUserModalShow(false)}
        action={addToFavorites}
        recipe={selectedUserRecipe}
      /> */}
      <Modal
    className={mood}
      show={userModalShow}
      onHide={()=>setUserModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='text-center '>
        <span style={{width:32,height:32}}
         className="position-absolute top-0 end-0 rounded-circle border-2 border border-danger m-3 text-danger cursor-pointer fs-6 d-inline-flex align-items-center justify-content-center" >
          <i onClick={()=>setUserModalShow(false)} className='fa fa-close text-danger'></i>
        </span>
        <div className="p-0 ">

        <img src={selectedUserRecipe?.imagePath?`${BASE_URL}/${selectedUserRecipe?.imagePath}`:sadGirl} alt={selectedUserRecipe?.name} height={280} className="rounded" />
        </div>
       <div>
         <h4 className='my-3'>{selectedUserRecipe?.name}</h4>
        <p>
          {selectedUserRecipe?.description}
        </p>
        <h5 className="text-accent">${selectedUserRecipe?.price}</h5>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-inline-block' onClick={()=>addToFavorites(selectedUserRecipe?.id)}>
          <MainButton>add to favorites</MainButton>
        </div>
      </Modal.Footer>
    </Modal>
    </>
  );
}
