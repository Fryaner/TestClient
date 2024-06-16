import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from './app/router';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Provider } from 'react-redux'
import {store} from './store'
import { Toaster } from './UI/Toaster';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster/>
    </Provider>
);
