import React, { useState, useEffect } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

function TestUpdate3() {
    const [response, setResponse] = useState(null);
    const [id, setId] =  useState(1);
    const [title, setTitle] =  useState("this song");


    const [song, setSong] =  useState([id, title]);

    const handleSave = () => {
    
      // POST request using axios inside useEffect React hook
      const url ="http://localhost/php_api_test/apiBasic/updateSongInPlaylist.php"
      axios.post(url, { id: id, title: title})
          .then(response => setResponse(response.data))

      // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }

    useEffect(() => {
    
       
      
    }, []);

    return (
        <div >
            <h5 className="card-header">POST Request with React Hooks</h5>
            Song titel: <span> </span>
            <input className= "small" type="text"  
                      value = {title}
                      onChange= {((event) => {setTitle(event.target.value)})}
            />
            <Button variant="secondary" onClick={handleSave}>Save</Button>

            <div className="card-body">
                response: {response}
            </div>
        </div>
    );
}

export  default TestUpdate3 ;