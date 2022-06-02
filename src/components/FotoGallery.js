import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';

import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';


//  ModSecurity stond niet aan bij hostingpartij bhosted: opgelost 

const FotoGallery = (props) => {

  // props pageFilter = home or messages

  const [image, setImage] = useState("");
  // const [pageFilter, setPageFilter] = useState(props.pageFilter) // 
  // const [code, setCode] = useState("10") // code voor api, die geeft geen data bij foute code.
  const [fileListData, setFileListData] = useState(null)
  
 
  const [code] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem('code');
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : '10';
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return '10';
    }
  });

   const [username, setUsername] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem('username');
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : 'guest';
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return 'guest';
    }
  });

  const [basisURL, setBasisURL] = useState(() => {
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/"
    else 
      return "https://silvermusic.nl/test/apiBasic/"
  });

  const [basisImageURL, setBasisImageURL] = useState(() => {
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/images/" + props.parentName + '/' + props.groupName + '/'
    else 
      return "https://silvermusic.nl/test/apiBasic/images/" + props.parentName + '/' + props.groupName + '/'
  });

  useEffect(() => {
    let fetchURL = basisURL + "listFileNamesV2.php"

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({'code': code, 'filter':"", 'groupName': props.groupName, 'parentName': props.parentName})
    };

    const fetchFileNamesData = async () => {
      // get the data from the api
      const res = await fetch(fetchURL, requestOptions);
      return res.json();
    }

    // call the function
    fetchFileNamesData()
      .then((data) => {
        setFileListData(data['resData'])
      })
      // make sure to catch any error
       
      .catch((error) => {
        console.log(error)
       //  alert("error waarschijnlijk is de map leeg --> \n" + error)
      }) 
  
  }, [image])

  return (
    <>
    . Images die zijn ge-upload. 
      {fileListData?
      <CardGroup>
        {fileListData.map((item, key) => {
          return (
             <Card key={key} className="minWidth3">
             <Card.Img variant="bottom" 
                src={basisImageURL + item.filename}  />
             <Card.Body>
               <Card.Title></Card.Title>
             <Card.Text className="xSmall">
                {item.filename} <br/>
                </Card.Text>
             </Card.Body>
           </Card>
          )

        })}   
      </CardGroup> 
      :<div>Er zijn geen images gevonden voor deze group</div>
    }    

    
    </> 

  )
}

export default FotoGallery;