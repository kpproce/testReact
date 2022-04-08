import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

// testen van de API checkAccesscode.php
// Api in:        userName and code
// Api response:  'Message', 'ErrorMessage' 'Access' (true/false)     

const Test_API_checkAccessCode = () => {

  const [userName, setUserName] = useState("guest") //
  const [code, setCode] = useState("10") //
  const fetchURL = "http://localhost/php_api_test/apiBasic/checkAccessCode.php"
  const [response, setResponse] = useState(null);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'userName': userName, 'code': code})
  };


  const handleSave = () => {
    // POST request using axios inside useEffect React hook
    fetch(fetchURL, requestOptions)
      .then((res) => {
        if (!res.ok) { 
          throw res;  }
        return res.json()
      })
      .then((res) => setResponse(res))
  }

  return (
    <>
      <div>
        userName: 
        <input className ="width40"
          type="text"
          placeholder="UserName"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        loginCode: 
        <input className ="width20"
          type="text"
          placeholder="##"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <Button variant="primary" onClick={handleSave}>
          check 
      </Button>
    <br></br>
      {response? 
        <>{response['Message']} <br/> {response['ErrorMessage']}
        </> 
      : 
      "no Result"
      }
    </div> 

    </>
  );
 
}

export default Test_API_checkAccessCode;