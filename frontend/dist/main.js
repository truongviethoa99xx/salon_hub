import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import Router from './Router';
import './styles.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(StrictMode, { children: _jsx(Router, {}) }));
