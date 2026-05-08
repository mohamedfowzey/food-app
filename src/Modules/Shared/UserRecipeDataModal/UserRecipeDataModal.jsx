import React, { useContext } from 'react'
import MainButton from '../MainButton/MainButton'
import { ContextFounder } from '../../../contexts/UserConrtrxt'
import { BASE_URL } from '../../../Constants/axiosClient'
import { Modal } from 'react-bootstrap'

export default function UserRecipeDataModal(showModal,onhide,action,recipe) {
  const {mood} = useContext(ContextFounder)
  return (
    <Modal
    className={mood}
      show={showModal}
      onHide={onhide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='text-center'>
        <span style={{width:32,height:32}}
         className="position-absolute top-0 end-0 rounded-circle border-2 border border-danger m-3 text-danger cursor-pointer fs-6 d-inline-flex align-items-center justify-content-center" >
          <i onClick={onhide} className='fa fa-close text-danger'></i>
        </span>
        <img src={`${BASE_URL}/${recipe?.imagePath}`} alt="Sad Girl" />
        <h4 className='my-3'>recipe name</h4>
        <p>
          recipe description 
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-inline-block' onClick={()=>action(recipe?.id)}>
          <MainButton>add to favorites</MainButton>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
