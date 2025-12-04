import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './i18n/config';
import Router from './Router';
import './styles.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
