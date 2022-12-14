import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ToggleColorTheme from './components/utils/ToggleColorTheme';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToggleColorTheme>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ToggleColorTheme>,
  </Provider>,
);
