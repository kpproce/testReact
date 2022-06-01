import React, { useEffect, useState } from 'react';
import { Button} from "react-bootstrap";

// Usage

function LoginLocalStorage(props) {
  // Similar to useState but first arg is key to the value in local storage.
  const [username, setUsername] = useLocalStorage('username', 'guest')
  const [code, setCode] = useLocalStorage('code', '10')
  const [groupName, setGroupName] = useLocalStorage('groupName', 'none')
  const [groupNames, setGroupNames] = useState(null)

  const [parentName, setParentName] = useState('Silvermusic')

  useEffect(() => {
    let fetchURL=""

    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      fetchURL = "http://localhost/php_api_test/apiBasic/listGroups.php"
    else 
      fetchURL = "https://silvermusic.nl/test/apiBasic/listGroups.php"

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }, 
      body:  JSON.stringify({'username': username, 'code': code, 'parentName':parentName, 'groupName': groupName})
    };

    const fetchFileNamesData = async () => {
      // get the data from the api
      const res = await fetch(fetchURL, requestOptions);
      return res.json();
    }

    // call the function
    fetchFileNamesData()
      .then ((data) => {
        // console.log ("resData", data['resData']) 
        let groupList = []
        data['resData'].forEach (item => {
          groupList.push(item.groupName)
        })
        // console.log ("groupList", groupList)

        setGroupNames(groupList)

      })
      
      // make sure to catch any error
       
      .catch(console.error)
  
  }, []) // [image] if upload is part of this function


      
// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


  return (
    <div>
      <input className ="width30"
        type="text"
        placeholder="Enter accesscode"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input className ="width20"
        type="text"
        placeholder="Enter accesscode"
        value={code}
        onChange={e => setCode(e.target.value)}
      />

     

      <select name="groupName" id="groupName" value={groupName} onChange={e => setGroupName(e.target.value)}>
        {groupNames?
          groupNames.map((item, index) => (  
            <option value={item}>{item}</option>
         )) 
         :  <option value='geen groep'>geen groep (geen data)</option>
        }
      </select>

    </div>
  );
}


export default LoginLocalStorage;