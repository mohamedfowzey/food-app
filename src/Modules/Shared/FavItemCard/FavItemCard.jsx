import sadGirl from '../../../assets/sadGirl.svg'
import { BASE_URL } from '../../../Constants/axiosClient'
export default function FavItemCard({item,showModal,setId}) {

  return (
    <div className="card mb-3" >
  <img height={200} src={item?.recipe?.imagePath?`${BASE_URL}/${item?.recipe?.imagePath}`:sadGirl} className="card-img-top object-fit-cover" alt="..." />
  <div className="card-body">
    <h5 className="card-title position-relative">
      {item?.recipe?.name}
    <span onClick={()=>{showModal();setId(item.id)}} className="position-absolute bottom-0 end-0 text-danger cursor-pointer"><i className = 'fa fa-trash'></i></span>
      </h5>
    <p className="card-text">{item?.recipe?.description}</p>
  </div>
</div>
)
}
