import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
        <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
    </React.StrictMode>
);
