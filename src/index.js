import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MarvelService from './services/MarvelService'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const marvel = new MarvelService()
// console.log(marvel.getAllCharacters())
