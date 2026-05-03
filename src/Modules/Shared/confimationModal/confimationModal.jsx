import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import sadGirl from '../../../assets/sadGirl.svg'

export default function ConfimationModal({show,onHide,ondelete,type}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Confirm Delete
        </Modal.Title> */}
      {/* </Modal.Header> */} 
      <Modal.Body className='text-center'>
        <span style={{width:32,height:32}}
         className="position-absolute top-0 end-0 rounded-circle border-2 border border-danger m-3 text-danger cursor-pointer fs-6 d-inline-flex align-items-center justify-content-center" >
          <i onClick={onHide} className='fa fa-close text-danger'></i>
        </span>
        <img src={sadGirl} alt="Sad Girl" />
        <h4 className='my-3'>Delete This {type}?</h4>
        <p>
          are you sure you want to delete this {type} ? if you are sure just click on delete it
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={()=>ondelete()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
