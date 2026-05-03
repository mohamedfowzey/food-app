import React, { useState } from 'react'
import MainButton from '../MainButton/MainButton'
import { useForm } from 'react-hook-form'
import { Button, Modal } from 'react-bootstrap';
import { API } from '../../../Constants/axiosClient';

export default function CategoriesDataModal(props) {
  const [inputValue, setInputValue] = useState(props.category?.name || '');
  const {register,handleSubmit,formState:{errors}} = useForm();
  const onsubmit = (data) => {
    if(props.type == 'add'){
    API.post('/Category',data).then(()=>{props.refresh()})
    props.onHide()
  }
  else if(props.type == 'edit'){
    API.put(`/Category/${props.category?.id}`,data).then(()=>{props.refresh()})
    props.onHide()
  }
}
  return (
     <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onsubmit)}>
          <input type="text" className='form-control' {...register("name", { required: 'name is required' })} placeholder='Category Name'
          value={inputValue} onChange={e=>setInputValue(e.target.value)} 
          />
          {errors.name && <p className='text-danger'>{errors.name.message}</p>}
          <div className="text-end mt-3 ">
                      <MainButton width={'auto'}>Save</MainButton>
        <Button className='ms-2' onClick={props.onHide}>Close</Button>

          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
