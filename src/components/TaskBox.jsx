/* eslint-disable react/prop-types */
import Column from "./Column";
import {  addEvent, pushTask, deleteEvent, deleteTask, initialState } from "../slices/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { EventsContext } from "../context/currentEventContext";
import { useContext } from "react";
import { DragDropContext } from 'react-beautiful-dnd';

const TaskBox = () => {
  const { currentEvent, setCurrentEvent } = useContext(EventsContext);
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();

  const handleRemove = () => {
    const result = events.filter(event => event.title !== currentEvent.title)[0] || initialState[0]
    dispatch(deleteEvent(currentEvent.title));
    if(events.length === 1) {
      dispatch(addEvent(initialState[0]));
    }
    setCurrentEvent(result);
  }

  const onDragEnd = (result) => {
    console.log(result);
    if(!result) return ;

    const { source, destination } = result;

    if(source.droppableId === destination.droppableId) return;

    // remove task from source
    // eventIndex, tag, task.id
    const eventIndex = events.findIndex(item => item.title === currentEvent.title);
    const curTask = events[eventIndex][source.droppableId][source.index];
    dispatch(deleteTask({eventIndex, tag: source.droppableId, id: source.index}))

    // add task to the destination
    // eventIndex, tag, title, details,

    dispatch(pushTask({eventIndex, tag: source.droppableId, task: curTask }));
  };
  return (
    <div className='px-5 py-3 h-100 flex-fill'>
      <div className=' d-flex align-content-center gap-3'>
        <h3 className=' fw-bold '>All Tasks</h3>
        <button 
          onClick={handleRemove}
          className=' btn btn-outline-danger rounded-2 text-dark fst-italic border-2 '
        > 
          Remove this Event
        </button>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className=' d-flex gap-5 mt-3'>
          {['To do','In progress','Completed'].map(item => {
            return (
              <Column key={item} tag={item} />
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}

export default TaskBox;
