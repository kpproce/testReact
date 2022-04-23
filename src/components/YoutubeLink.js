import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'
import {FindUrlInText} from './FindUrlInText.js';

// testen van de API checkAccesscode.php
// Api in:        userName and code
// Api response:  'Message', 'ErrorMessage' 'Access' (true/false)     

// body: JSON.stringify({'userName': userName, 'code': code})

const YoutubeLink = (props) => {

  const [data, setData] = useState(null);
  const [mediaUrl, setMediaUrl]     = useState("-")
 
  useEffect(() => {

      setMediaUrl(FindUrlInText(props.message,true))
      console.log("--------------")
      console.log(mediaUrl)
  },[])

  
  return (
    <>
      {(mediaUrl.includes("youtu.be") ||mediaUrl.includes("youtube")?
          <ReactPlayer key={mediaUrl} width="100%" controls= {true} url={mediaUrl}></ReactPlayer>
        :
          <p className="xxSmall"> Geen youtube linkje </p>
      )}
    </>
  )
 
}

export default YoutubeLink;