import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
const ArrowBackIcon = require('@mui/icons-material/ArrowBack');

const root = ReactDOMClient.createRoot(document.querySelector('#root'));
root.render(<App/>);
