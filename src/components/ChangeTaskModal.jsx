/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ChangeTaskModal = ({ handleTaskSave, task, show, setShow }) => {
  const [title, setTitle] = useState(task.title);
  const [details, setDetails] = useState(task.details);
  
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Task</Modal.Title>
        </Modal.Header>
        <Form.Control 
          className=' rounded-0 shadow-none p-3'
          size="lg" 
          type="text" 
          value={title}
          placeholder="Enter task name" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control 
          as="textarea" 
          className=' rounded-0 shadow-none fs-5 p-3'
          rows={3}  
          value={details}
          placeholder='Enter task details'
          onChange={(e) => setDetails(e.target.value)}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleTaskSave(title, details, task.id)}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChangeTaskModal;