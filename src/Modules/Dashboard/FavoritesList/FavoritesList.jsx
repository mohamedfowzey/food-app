import React, { useEffect, useState } from 'react'
import { API } from '../../../Constants/axiosClient';
import { toast } from 'react-toastify';
import FavItemCard from '../../Shared/FavItemCard/FavItemCard';

export default function FavoritesList() {
  const [favorites,setFavorites] = useState([]);
  const getFavorites = async()=>{
    try{
      const response =await API.get('/userRecipe');
      setFavorites(response.data.data);
      
    }
    catch(error){
      toast(error.response.data.message || 'something went wrong')
    }
  }
  useEffect(()=>{
    (()=>{

      getFavorites()
    })()
   },[])
  return (
    <>
            <div className="row m-0 py-3 justify-content-around">

    {
      favorites.map((item)=>(<>
      <div className="col-md-4 col-sm-6 col-12">
      <FavItemCard item={item}/>
      </div>
    </>))
  }
  </div>
  </>
  )
}
