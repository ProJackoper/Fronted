import React from 'react';
import Witaj from "./Witaj";
import ReactDOM from 'react-dom/client';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Witaj />
  </React.StrictMode>
);

root.render(
  <Witaj/>,
  document.getElementById('root')
)


