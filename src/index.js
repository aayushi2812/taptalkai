import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserForm from './UserForm/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing';
import Connections from './Connections';
import QRScanner from './QRScanner';
import Keynotes from './Key_Note_Generator/KeyNote';
import AddConnection from './AddConnection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/landing" element={<Landing />} />
      <Route path='/userProfile' element={<UserForm />} />
      <Route path='/connections' element={<Connections />} />
      <Route path='/qrscanner' element={<QRScanner />} />
      <Route path='/keynotes' element={<Keynotes />} />
      <Route path='/addConnection' element={<AddConnection />} />
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
