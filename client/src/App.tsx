import React ,{ useState } from 'react'

import Landing from './modules/Landing/Landing'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Landing />
    </div>
  )
};

export default App;