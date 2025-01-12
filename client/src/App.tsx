import React  from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './modules/Landing/Landing'
import Home from './modules/Home/Home';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/homesssssssssssssssssssssssss230000000' element={<Landing />} />
      </Routes>
    </Router>
  )
};

export default App;