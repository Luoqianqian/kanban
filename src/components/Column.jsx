/* eslint-disable react/prop-types */
import Task from './Task';
import { useContext } from "react";
import { EventsContext } from '../context/currentEventContext';
import AddTaskModal from './AddTaskModal';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../slices/eventsSlice';
import { Droppable, Draggable } from "react-beautiful-dnd";

const Column = ({tag}) => {

  const {currentEvent} = useContext(EventsContext);
  const dispatch = useDispatch();
  const event = useSelector(state => state.events.find(item => item.title == currentEvent.title));
  const eventIndex = useSelector(state => state.events.findIndex(item => item.title === event.title));

  const removeTaskHandle =(id) => {
    dispatch(deleteTask({eventIndex, tag, id}))
  }

  return (
    <div className=' bg-info rounded-3 p-3 d-flex gap-2 flex-column align-content-center w-33'>
      <h5 className=' fs-6 fst-italic fw-bold'>{tag}</h5>
      <AddTaskModal name={event.title} tag={tag} />
      <Droppable  droppableId={tag} >
        {(provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {event[tag]?.map((item, index) => (
                <Draggable 
                  key={item.id} 
                  draggableId={item.id} 
                  index={index} 
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task 
                        eventIndex={eventIndex}
                        tag={tag}
                        key={item?.id} 
                        task={item} 
                        removeTaskHandle={removeTaskHandle}
                      />
                    </div>
                  )}
                </Draggable>
            ))}
            {provided.placeholder} 
          </div>
        ))}
      </Droppable>
    </div>
  )
}

export default Column;
