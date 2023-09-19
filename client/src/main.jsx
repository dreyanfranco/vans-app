import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App';
import { AuthProviderWrapper } from './context/auth.context';
import './index.css';

const router = createBrowserRouter(createRoutesFromElements)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProviderWrapper>
  </React.StrictMode>
)
