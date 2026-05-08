import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import sadGirl from '../../../assets/sadGirl.svg'
import { ContextFounder } from '../../../contexts/UserConrtrxt'

export default function ConfirmationModal({show,onHide,action,type}) {
  const {mood} = useContext(ContextFounder)
  return (
    <Modal
    className={mood}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className='text-center'>
        <span style={{width:32,height:32}}
         className="position-absolute top-0 end-0 rounded-circle border-2 border border-danger m-3 text-danger cursor-pointer fs-6 d-inline-flex align-items-center justify-content-center" >
          <i onClick={onHide} className='fa fa-close text-danger'></i>
        </span>
        <img src={sadGirl} alt="Sad Girl" />
        <h4 className='my-3'>{type === 'logout'? type : `Delete This ${type}`}?</h4>
        <p>
          are you sure you want to {type==='logout'?type:`delete this ${type}`} ? if you are sure just click on {type==='logout'?type:'delete'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={()=>action()}>
          {type==='logout'?type:'delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
