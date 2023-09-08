/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addTask } from '../slices/eventsSlice';
import { useDispatch } from 'react-redux';
import { EventsContext } from '../context/currentEventContext';
import { useSelector } from 'react-redux';

function AddTaskModal({tag}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const { currentEvent } = useContext(EventsContext);
  const events = useSelector(state => state.events);
  const currentEventIndex = events.findIndex(item => item.title === currentEvent.title);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleTaskCreate = () => {
    if(!title || !details) return;
    dispatch(addTask({currentEventIndex, tag, title, details}));
    handleClose();
  };

  return (
    <>
      <Button variant="secondary fw-bold" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Form.Control 
          className=' rounded-0 shadow-none p-3'
          size="lg" 
          type="text" 
          placeholder="Enter task name" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control 
          as="textarea" 
          className=' rounded-0 shadow-none fs-5 p-3'
          rows={3}  
          placeholder='Enter task details'
          onChange={(e) => setDetails(e.target.value)}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTaskCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;