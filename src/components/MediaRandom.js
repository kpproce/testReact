import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'

// testen van de API checkAccesscode.php
// Api in:        userName and code
// Api response:  'Message', 'ErrorMessage' 'Access' (true/false)     

// body: JSON.stringify({'userName': userName, 'code': code})

const MediaRandom = (props) => {

  let URL =""
  const hostName = window.location.host
  if (hostName.includes("localhost")) 
    URL = "http://localhost/php_api_test/apiBasic/getMediaLink.php"
  else 
    URL = "https://silvermusic.nl/test/apiBasic/getMediaLink.php"
  
  const [data, setData] = useState(null);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'username': props.username, 
          'code': props.code, 'pageFilter':'home', 'n':1})
  };

  async function getData() {
    const res = await fetch(URL, requestOptions);
    if (!res.ok) {
      throw res;
    }
    return res.json();
  }

  useEffect(() => {
    getData()
    .then((res) => setData(res['resData']))
  }, [])

  return (
    <>
      {data? 
        <>
          {data.map((item, key) => {
            return (
                (item.url.indexOf('youtu') !== -1)? //true                  
                  <ReactPlayer width="100%" controls= {true} url={item.url} />
                : <>
                  <img width="100%" src={item.url} alt={item.url} /> 
                </>    
            )
        }) } 
        </>
      : 
        "no Result"
      }

    </>
  );
 
}

export default MediaRandom;