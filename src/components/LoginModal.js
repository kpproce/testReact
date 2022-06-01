import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import { FaEdit} from 'react-icons/fa';
import LoginLocalStorage from './LoginLocalStorage';

function LoginModal(props) {
  const [show, setShow] = useState(false);
  const [articleId, setArticleId] = useState(null);
  
  // const [id, setId] =  useState(1);
  // const [title, setTitle] =  useState("this song");
  const [response, setResponse] = useState(null);
  const [statusTekst, setStatusTekst] = useState("--");
  const [parentName, setParentName] = useState("Sivermusic");

  const [groupName, setGroupName] = useState(() => {
    try {
      const item = window.localStorage.getItem('groupName');
      return item ? JSON.parse(item) : 'Huusband2';
    } catch (error) {
      console.log(error);
      return 'Huusband2';
    }
  });

  const code="10"; // default guest
  const handleShow = () => setShow(true);
  const handleClose = () => {
    window.location.reload();
    setShow(false); 
    };

    return (
      <>
        <Button variant="dark" onClick={handleShow}>
          <FaEdit size={30} style={{ color: 'white' }} />
           {" "}
         {/* // class="fas fa-pencil-alt fa-fw" */}
          <span className="xSmall">{props.title} {groupName}</span> 
        </Button>
  
        <Modal show={show} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>login {parentName}</Modal.Title>
          
          </Modal.Header>
          <Modal.Body> <LoginLocalStorage parentName={parentName}/><br/>Login met guest 10 om te kunnen kijken <br/> Kies een groep (bijv Huusband 2)</Modal.Body>
          <Modal.Footer>      
            <Button variant="primary" onClick={handleClose}>
              sla op en sluit 
            </Button>{statusTekst} </Modal.Footer>
        </Modal>
      </>
    );
  } 
  export default LoginModal; 