import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.sass';
import RoutesList from './components/routes/RoutesList';
import { Provider } from 'react-redux';
import { store } from './redux';


const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <RoutesList/>
    </Provider>
);

