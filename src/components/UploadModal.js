import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import { FaUpload} from 'react-icons/fa';

import UploadFile from './UploadFile';
import LoginLocalStorage from './LoginLocalStorage';

function UploadModal(props) {
    const [show, setShow] = useState(false);
    // const [id, setId] =  useState(1);
    // const [title, setTitle] =  useState("this song");
    const [response, setResponse] = useState(null);
    const [statusTekst, setStatusTekst] = useState("--");
    const [filename, setFilename] = useState("");
    const handleShow = () => setShow(true);


    let updateUrl=""
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      updateUrl = "http://localhost/php_api_test/apiBasic/updateSongV2.php";
    else 
      updateUrl = "https://silvermusic.nl/test/apiBasic/updateSongV2.php";

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    };

  /*   const handleSave = () => {
      setStatusTekst("saved")
      props.callBackImageUpload("a.png");
    } */

    const handleClose = () => { 
      // props.callBack();
      setShow(false); 
      props.callBackImageUpload(filename);
    };

  /*   const handleSaveAndClose = () => { 
      handleSave();
      handleClose(); 
    }; */

    const handleFileNameChanged  = (filename) => { 
      // toegevoegd 2022 kies img uit map images
      setFilename(filename);
      // alert ("uploadModal.js aangeroepen ..***.." + filename)
      // setImage("a.png");
      // console.log(fileName);
     
    };

    return (
      <>
        <Button variant="dark" onClick={handleShow}>
          <FaUpload size={20} style={{ color: 'white' }} />
           {" "}
          <span className="small"> </span> 
        </Button>
  
        <Modal show={show} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>Upload file</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
            <UploadFile callbackFileChanged ={handleFileNameChanged}/>
          </Modal.Body>
          <Modal.Footer>     
            <Button variant="primary" onClick={handleClose}>
              sluit
              {/* props.selectedStart bevat de huidige filenaam*/ }
            </Button>{statusTekst} </Modal.Footer>
        </Modal>
      </>
    );
  } export default UploadModal; 