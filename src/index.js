import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // <-- Importa el Provider
import { store } from './redux/store'; // <-- Importa nuestro store
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* <-- Envuelve la App con el Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);