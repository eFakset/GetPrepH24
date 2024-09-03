import React from 'react';
import ReactDOM from 'react-dom/client';
import Dagligvare from './Dagligvare';
import './basic.css';

// Finner element i HTML DOM (index.html), med id=root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dagligvare />
  </React.StrictMode>
);