import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
 
export const initialState = JSON.parse(localStorage.getItem('events')) || [{
  title: 'Default Event',
  ['To do']: [],
  ['In progress']: [],
  ['Completed']: [],
  }];

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      // event
      state.push(action.payload);
      localStorage.setItem('events', JSON.stringify(state));
    },
    deleteEvent: (state, action) => {
      // event.title
      const newEvents = state.filter(item => item.title != action.payload);
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    },
    updateEvent: (state, action) => {
      // 
      const index = state.findIndex(item => item.title === action.payload.title);
      state[index] = action.payload;
      localStorage.setItem('events', JSON.stringify(state));
    },
    addTask: (state, action) => {
      // eventIndex, tag, title, details, 
      const {currentEventIndex, tag, title, details} = action.payload;
      state[currentEventIndex][tag].push({title, details, id: uuidv4()});
      localStorage.setItem('events', JSON.stringify(state));
    },
    pushTask: (state, action) => {
      // eventIndex, tag, task
      const {eventIndex, tag, task, index} = action.payload;
      let {length} = action.payload;
      console.log(length);
      if(index >= length) {
        state[eventIndex][tag].push(task);
      } else {
        while(length > index) {
          state[eventIndex][tag][length] = state[eventIndex][tag][length-1];
          length--;
        }
        state[eventIndex][tag][index] = task;
      }
      localStorage.setItem('events', JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      // eventIndex, tag, task.id
      const { eventIndex, tag, id} = action.payload;
      const taskIndex = state[eventIndex][tag].findIndex(item => item.id === id);
      state[eventIndex][tag].splice(taskIndex, 1);
      localStorage.setItem('events', JSON.stringify(state));
    },
    updateTask: (state, action) => {
      // eventIndex, tag, title, details, task.id
      const {eventIndex, tag, id, title, details} = action.payload;
      const taskIndex = state[eventIndex][tag].findIndex(item => item.id === id);
      state[eventIndex][tag][taskIndex] = { id, title, details };
      localStorage.setItem('events', JSON.stringify(state));
    }
  },
});

export const { addEvent, deleteEvent, updateEvent, addTask, pushTask, deleteTask, updateTask } = eventsSlice.actions;
export default eventsSlice.reducer;
