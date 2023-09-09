import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/scss/index.scss';
import store from './src/store';
import { Provider } from 'react-redux';
import { EventsContextProvider } from './src/context/currentEventContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <EventsContextProvider>
      <App />
   </EventsContextProvider>
  </Provider>
)
