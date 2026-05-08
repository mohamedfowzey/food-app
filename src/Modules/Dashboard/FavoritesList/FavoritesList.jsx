import { useEffect, useState } from 'react';
import { API } from '../../../Constants/axiosClient';
import { toast } from 'react-toastify';
import ConfimationModal from '../../Shared/ConfimationModal/ConfimationModal.jsx';
import FavItemCard from '../../Shared/FavItemCard/FavItemCard.jsx';
import { Pagination } from 'react-bootstrap';
import { ContextFounder } from '../../../contexts/UserConrtrxt';

export default function FavoritesList() {
  const [favorites,setFavorites] = useState([]);
  const [show,setShow] = useState(false);
  const [idToDelete,setIdToDelete] = useState('');  
  const removeDuplicates = (list)=>{
    const duplicates = []
    const hashMap = {} 
    list.forEach(item=>{
      const recipeid = item?.recipe?.id;
      if(Object.hasOwn(hashMap,recipeid)){
        duplicates.push(item)
      }
      else{
        
        hashMap[recipeid] = item
      }
    })
    
    duplicates.forEach(item=>{
      API.delete(`/userRecipe/${item?.id}`).then(response => console.log(response)).catch(e=>console.log(e))
      
    })
    return(Object.values(hashMap))
  }
  const getFavorites = async()=>{
    try{
      const response =await API.get('/userRecipe?pageNumber=1&pageSize=50');
      setFavorites(response.data.data);      
    }
    catch(error){
      toast(error.response.data.message || 'something went wrong')
    }
  }
  const ondelete = async (id)=>{
    try {
      const response = await API.delete(`/userRecipe/${id}`)
      toast.success(response.data.message || 'item deleted successfuly');
      getFavorites()
      
    } catch (error) {
      toast.error(error.response.data.message || 'something went wrong')
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
      removeDuplicates(favorites).map((item,index)=>(
      <div className="col-md-4 col-sm-6 col-12" key={index}>
      <FavItemCard  item={item} setId={setIdToDelete} showModal={()=>setShow(true)}/>
      </div>
    ))
  }
 
  </div>
  <ConfimationModal
  type={'item'}
  show={show}
  onHide={()=>setShow(false)}
  action={()=>{ondelete(idToDelete);getFavorites();setShow(false)}}
  />
  </>
  )
}
