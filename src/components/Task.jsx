/* eslint-disable react/prop-types */
import ChangeTaskModal from './ChangeTaskModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/eventsSlice';

 const Task = ({ eventIndex, tag,task, removeTaskHandle }) => {

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleTaskSave = (title, details, id) => {
    if(!title || !details) return;
    dispatch(updateTask({eventIndex, tag, title, details, id}));
    setShow(false);
  };

  return (
    <>
      <div onClick={() => setShow(true)} className=' mb-2 border p-2 bg-light rounded-2'>
        <div className=" d-flex align-items-center gap-2">
          <span className=' bg-primary rounded-circle d-inline-block mb-2 ' style={{width: 8, height: 8}} />
          <h5 className=" fs-7">{task.title}</h5>
        </div>
        <div className=" text-black-50 fs-8 text-break overflow-hidden">
          {task.details}
        </div>
        <div className=' d-flex justify-content-end p-2 '>
          <button onClick={() => removeTaskHandle(task.id)} className='btn btn-task-remove fst-italic p-0 m-0'>-</button>
        </div>
      </div>
      <ChangeTaskModal handleTaskSave={handleTaskSave} task={task} show={show} setShow={setShow} />
    </>
  )
}

export default Task;