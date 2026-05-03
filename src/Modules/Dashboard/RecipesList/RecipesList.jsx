import React, {  useEffect, useState } from 'react'
import headerBoy from '../../../assets/headerBoy.svg'
import Header from '../../Shared/Header/Header'
import { useNavigate } from 'react-router-dom';
import MainButton from '../../Shared/MainButton/MainButton';
import { API, BASE_URL } from '../../../Constants/axiosClient';
import { toast } from 'react-toastify';
import NoData from '../../Shared/NoData/NoData';
import ConfimationModal from '../../Shared/confimationModal/confimationModal';
import LoadingElement from '../../Shared/LoadingElement/LoadingElement';
export default function RecipesList() {
const navigate = useNavigate();
const [recipes, setRecipes] = useState([]);
const [deletingId, setDeletingId] = useState('');
const [modalShow, setModalShow] = useState(false);
const [selectedRecipe, setSelectedRecipe] = useState(null);

const onDelete = () => {
  setDeletingId(selectedRecipe?.id);
      setModalShow(false);
    API.delete(`/Recipe/${selectedRecipe?.id}`).then(() => {
      getRecipes();
    }).catch((err) => {
      toast.error(err.response?.data?.message);
    }).finally(() => {
  setDeletingId('');
});
}
const getRecipes = async () => {
    try {
      const response = await API.get("/recipe");
      setRecipes(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    (() => {
      getRecipes();
    })();
  }, []);
  return (
    <>
      <Header image={headerBoy} title={`Recipes Items`} description="You can now add your items that any user can order it from the Application and you can edit" />
      <div className="row p-5 justify-content-between align-items-center flex-wrap">
              <div className="col-md-8">
                <h2>Recipe Table Details</h2>
                <p>Manage your recipes here</p>
              </div>
              <div className="col-md-4 text-end">
                <div onClick={()=>navigate('../add-recipe')} className="d-inline-block">
                  <MainButton width="auto">
                    Add Recipe
                  </MainButton>
                </div>
              </div>

            </div>
            {recipes.length === 0 ? (
                    <NoData/>
                  ) : (
                    <div className="table-responsive">
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
                            <img width={50} src={`${BASE_URL}/${recipe.imagePath}`} alt="recipe image " />
                            
                            {/* {recipe.imagePath} */}
                            </td>
                          <td>{recipe.description}</td>
                          <td>{recipe.price}</td>
                          <td>{recipe.category}</td>
                          <td>{recipe.tag.name}</td>
                          <td className="text-center">
                            {deletingId === recipe.id  ? <LoadingElement color="text-danger"  /> : 
                              <i
                              className="fa fa-trash text-danger cursor-pointer"
                              onClick={() => {
                                setSelectedRecipe(recipe);
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
                  </div>
                  
                  )}
                  
                        <ConfimationModal
                        type={'recipe'}
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          ondelete={onDelete}
                        />
    </>
  )
}
