import { useState, useEffect, useContext } from 'react';
import Home from './Home';
import UserCollection from './UserCollection';
import { PokeProvider } from './components/PokeContext';
import Pagination from './components/Pagination';
import Search from './Search';
import { Routes, Route } from 'react-router-dom';

function App() {  
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<UserCollection/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
