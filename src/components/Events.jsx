/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { EventsContext } from '../context/currentEventContext';
import AddEventModal from './AddEventModal';
import { useSelector } from 'react-redux';

const Events = () => {
  const { currentEvent, setCurrentEvent } = useContext(EventsContext);
  const events = useSelector(state => state.events);
  
  return (
    <div className=' w-25 d-flex flex-column align-content-center gap-3 border-end px-3'>
      {/* logo */}
      <h1 className='text-center fs-1 fst-italic fw-bold'>.kanban</h1>
      {/* add event btn */}
      <AddEventModal />
      {/* events list */}
      <div className='d-flex flex-column gap-2 text-center w-75 mx-auto '>
        <h3 className=' fs-5 fw-bold text-center mb-3'>My Project</h3>
        {events.map(event => {
          return (
            <div
              onClick={() => setCurrentEvent(event)}
              key={event.title} 
              className={` btn text-center border-white fs-8 p-2 ${currentEvent.title  === event.title?' bg-primary text-light rounded-3 ': ''}`}
            >
              {event.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Events;
