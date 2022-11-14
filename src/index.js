import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PokeProvider } from './components/PokeContext';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <PokeProvider>
        <App />
    </PokeProvider>
</BrowserRouter>
);

