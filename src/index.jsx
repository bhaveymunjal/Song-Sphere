import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DataLayer } from './DataLayer';
import reducer, { initialState } from './reducer';
import './index.css';
import App from './App';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <DataLayer initialState={initialState} reducer={reducer}>
          <App />
        </DataLayer>
      </Router>
    </Provider>
  </React.StrictMode>,
);
