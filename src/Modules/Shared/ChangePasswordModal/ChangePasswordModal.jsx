import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ChangePasswordModal(show,onhide) {

  return (
    <>
    <Modal show={show} onHide={onhide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onhide}>
            Close
          </Button>
          <Button variant="primary" onClick={onhide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
