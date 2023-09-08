/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { initialState } from "../slices/eventsSlice";

export const EventsContext = createContext();

export const EventsContextProvider = ({children}) => {

  const [currentEvent, setCurrentEvent] = useState(initialState[0]);

  return (
    <EventsContext.Provider value={{currentEvent, setCurrentEvent}}>
      {children}
    </EventsContext.Provider>
  )
};
