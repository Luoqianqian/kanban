/* eslint-disable react/prop-types */
import Column from "./Column";
import {  addEvent,  deleteEvent, pushTask, initialState, deleteTask } from "../slices/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { EventsContext } from "../context/currentEventContext";
import { useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const TaskBox = () => {
  const { currentEvent, setCurrentEvent } = useContext(EventsContext);
  const events = useSelector(state => state.events);
  const eventIndex = useSelector(state => state.events.findIndex(event => event.title === currentEvent.title));
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    console.log(result);
    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;
    const task = events[eventIndex][source.droppableId].find(item => item.id === draggableId);
    const dLength = events[eventIndex][destination.droppableId].length;
    // remove task from source
    dispatch(deleteTask({eventIndex, tag: source.droppableId, id: draggableId}));
    // add task to destination
    dispatch(pushTask({eventIndex, tag: destination?.droppableId, task, index: destination.index, length: dLength}));
  };

  const handleRemove = () => {
    const result = events.filter(event => event.title !== currentEvent.title)[0] || initialState[0]
    dispatch(deleteEvent(currentEvent.title));
    if(events.length === 1) {
      dispatch(addEvent(initialState[0]));
    }
    setCurrentEvent(result);
  }

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
      <DragDropContext onDragEnd={(result) => onDragEnd(result) }>
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
