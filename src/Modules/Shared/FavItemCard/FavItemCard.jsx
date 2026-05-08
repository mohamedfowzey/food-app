import React from 'react'
import sadGirl from '../../../assets/sadGirl.svg'
import { BASE_URL } from '../../../Constants/axiosClient'
export default function FavItemCard({item}) {

  return (
    <div className="card mb-3" >
  <img height={200} src={item?.recipe?.imagePath?`${BASE_URL}/${item?.recipe?.imagePath}`:sadGirl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{item?.recipe?.name}</h5>
    <p className="card-text">{item?.recipe?.description}</p>
  </div>
</div>
)
}
