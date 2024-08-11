import React ,{ useState } from 'react'
import './App.css'

import Landing from './modules/Landing/Landing'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h4>Whatsap fukcing pussys</h4>
      <Landing />
    </div>
  )
};

export default App;