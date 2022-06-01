import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import { FaUpload} from 'react-icons/fa';


import LoginLocalStorage from './LoginLocalStorage';

import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';

function ImageSelect(props) {
    const [code, setCode] = useState(props.code);
    const [show, setShow] = useState(false);
    // const [id, setId] =  useState(1);
    // const [title, setTitle] =  useState("this song");

    const [statusTekst, setStatusTekst] = useState("--");
    const [image, setImage] = useState(props.image);
    const [fileListData, setfileListData] = useState(null);  
    const handleShow = () => setShow(true);


    // IN --> image, basisURL
   
     // ****************  DIT IS HET DEEL WAT DE Images Fetch REGELT **************
    
     useEffect(() => {
      let fetchURL=""
  
      const hostName = window.location.host
      if (hostName.includes("localhost")) 
        fetchURL = "http://localhost/php_api_test/apiBasic/listFileNamesV2.php"
      else 
        fetchURL = "https://silvermusic.nl/test/apiBasic/listFileNamesV2.php";
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
        , body: JSON.stringify({'code': code, 'filter':""})
      };
  
      const fetchFileNamesData = async () => {
        // get the data from the api
        const res = await fetch(fetchURL, requestOptions);
        return res.json();
      }

      // call the function
      fetchFileNamesData()
        .then((data) => setfileListData(data['resData']))
        // make sure to catch any error
         
        .catch(console.error);;
    
    }, []) // [image] if upload is part of this function

    // ****************  EiNDE VAN HET DEEL WAT DE Images Fetch REGELT **************

  /*   const handleSave = () => {
      setStatusTekst("saved")
      props.callBackImageUpload("a.png");
    } */


    
    const handleClose = () => { 
      // props.callBack();
      setShow(false); 
    };


    return (
      <>
        <Button variant="dark" onClick={handleShow} >
        {/* <img width="20%" alt='imagesButtonBackground.png' src='images/imagesButtonBackground.png'></img> */}
         kies andere afbeelding
          <span className="small"> </span> 
        </Button>
  
        <Modal animation={false} show={show} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton className='stickyModal'>
            <Modal.Title>{image}</Modal.Title>
         
          </Modal.Header>
          <Modal.Body> 
                {fileListData?
                  <CardGroup>
                    {props.imageList.map((item, key) => {
                      return (
                        <Card key={key} className="minWidth3">
                        <Card.Img variant="bottom" 
                            src={props.basisURL + "images/" + props.parentName + '/' + props.groupName + '/' + item.filename} 
                            onClick={() => {
                              setImage(item.filename)
                              props.callBackFromImageSelect(item.filename) // de naam van de geuploade file
                              handleClose()
                            }}
                             />
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
                  :"empty, could not list filenames"
                }    

          </Modal.Body>
          <Modal.Footer>     
            <Button variant="primary" onClick={handleClose}>
              sluit
              {/* props.selectedStart bevat de huidige filenaam*/ }
            </Button>{statusTekst} </Modal.Footer>
        </Modal>
      </>
    );
  } export default ImageSelect; 