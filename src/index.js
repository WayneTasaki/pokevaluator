import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PokeProvider } from './components/PokeContext';
import App from './App';
import { HashRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<HashRouter>
    <PokeProvider>
        <App />
    </PokeProvider>
</HashRouter>
);

