import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'

// testen van de API checkAccesscode.php
// Api in:        userName and code
// Api response:  'Message', 'ErrorMessage' 'Access' (true/false)     

// body: JSON.stringify({'userName': userName, 'code': code})

const Test_getMediaLink = (props) => {

  const fetchURL = "http://localhost/php_api_test/apiBasic/getMediaLink.php"
  const [data, setData] = useState(null);
  const [random, setRandom] = useState(0 );

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'username': props.username, 
          'code': props.code, 'pageFilter':'home', 'n':1})
  };

  function fillRandom () {
    setRandom(Math.floor(Math.random()*3));
    return ""
  }

  async function getData() {
    const res = await fetch(fetchURL, requestOptions);
    if (!res.ok) {
      throw res;
    }
    return res.json();
  }

  useEffect(() => {
    getData()
    .then((res) => setData(res['resData']))
    .then(() => fillRandom())
  }, [])

  return (
    <>
      {data? 
        <>
          {data.map((item, key) => {
            return (
                (item.url.indexOf('youtu') !== -1)? //true
                  (key==random)?
                    <Col xs={12} md={8} lg={8} key={key}>  
                      <div className="player-wrapper"  >
                        <ReactPlayer width="99%" controls= {true} url={item.url} />
                      </div>
                    </Col>
                  :  null
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

export default Test_getMediaLink;