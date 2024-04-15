import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './globals.css';
import { ThemeProvider } from '@material-tailwind/react';
import {BrowserRouter} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>
      </BrowserRouter>
  </Provider>
)
