import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapNavbar from './components/BootstrapNavbar';
import './App.css';

function App() {

  const [state, setState] = useState('live') // make this update to show update
 
  useEffect(() => {
    document.title = "Silvermusic";  
  }, []);

  return (
      <>
        {state==='update'?
          <div>
            <p> 5 jui is een  update geplaats</p>
            <button onClick={() => setState('menu') } >probeer of het al werkt</button>
          </div>
        : <BootstrapNavbar/>
           
        }
      </>
      
  );
}

export default App;
