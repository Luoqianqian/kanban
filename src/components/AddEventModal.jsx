import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addEvent } from '../slices/eventsSlice';
import { useDispatch} from 'react-redux';

function AddEventModal() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = () => {
    if(!title) return;
    const event = {
      title,
      ['To do']: [],
      ['In progress']: [],
      ['Completed']: [],
    };
    dispatch(addEvent(event));
    setShow(false);
  };

  return (
    <>
      <Button variant="secondary fw-bold" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Form.Control 
          className=' rounded-0 shadow-none'
          size="lg" 
          type="text" 
          placeholder="Enter your event name" 
          onChange={(e) => setTitle(e.target.value)}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEventModal;