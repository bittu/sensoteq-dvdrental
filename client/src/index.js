import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import M3ThemeProvider from './theme/m3/M3ThemeProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <M3ThemeProvider>
      <CssBaseline enableColorScheme />
      <App />
    </M3ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
