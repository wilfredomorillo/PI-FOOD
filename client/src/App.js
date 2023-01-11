import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Landingpage from './components/landinpage/landinpage';



function App() {
  return (
    <div className="App">
    <Routes>
    < Route exact path={'/'} element= {<Landingpage/>}/>
    </Routes>
    </div>
    
  );
}

export default App;
