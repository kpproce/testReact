import { Callbacks } from 'jquery';
import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';

// geeft een knop, als editrechten. Knop voegt een nieuw leeg item aan newsItem (messages) toe in de database, met userName als bron. 
// Verder alles leeg. Komt bovenaan in de news items te staan, want laatste datum.

const SongInsert = (props) => {
  // doorgegeven in props: userName, code, bron. ik ga er van uit dat dit component alleen wordt aangeroepen al sdaarvoor genoeg rechten zijn. 

  const [fetchedData, setData] = useState(null)
  const [username, setUsername]    = useState((props.username) )
  const [code, setCode] = useState(props.code) //
  const [groupName, setGroupName] = useState(props.groupName) 
  const [parentName, setParentName] = useState(props.parentName) 
  
  const [role, setRole]  = useState(props.role) //
  const [showNewButton, setShowNewButton]  = useState(props.showNewButton) //


  // input to the fetch api: username, code, bron 
  const songNew =  {username, code, groupName} 

  let URL =""
  const hostName = window.location.host
  if (hostName.includes("localhost")) 
    URL = "http://localhost/php_api_test/apiBasic/newSong.php"
  else 
    URL = "https://silvermusic.nl/test/apiBasic/newSong.php"
  
  // alert(hostName)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(songNew)
  };

    const executeInsertFetch = () =>
    // fetch(fetchURL, requestOptions)
    fetch(URL, requestOptions)
      .then((res) => {
        if (!res.ok) { throw res }
        return res.json()
      })

      const handleInsertNewItem = () => { 
        alert("Item aangemaakt, ga naar songs, refresh browser (voorlopig, wordt nog opgelost) " + username)
    
        executeInsertFetch()
       //  props.callBack() // deze lukte niet
        // setShow(false); 
        //window.location.reload();
      };
   
  return (
    (showNewButton)?
        <Button  className="addItemButton small" onClick={(handleInsertNewItem)}>maak NEW Item</Button>
    : ""
    
  )
}

export default SongInsert;