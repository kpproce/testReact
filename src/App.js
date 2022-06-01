import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapNavbar from './components/BootstrapNavbar';
import './App.css';

function App() {

  const [state, setState] = useState('update')

  return (
      <>
        {state==='update'?
          <div>
            <p> Momenteel (1 juni) wordt update geplaats</p>
            <button onClick={() => setState('menu') } >probeer of het al werkt</button>
          </div>
        : <BootstrapNavbar/>
           
        }
      </>
      
  );
}

export default App;
