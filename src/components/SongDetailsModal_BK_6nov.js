import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import TestUpdateSongViaApi from './TestUpdateSongViaApi';
import { FaEdit} from 'react-icons/fa';


//https://react-bootstrap.github.io/components/modal/
const api = axios.create({
  // baseURL: 'http://localhost/php_api_test/apiBasic/writeMessage.php'
  baseURL: 'http://localhost/php_api_test/apiBasic/updateSongInPlaylist.php'
})

function SongDetailsModal(props) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleSave = () => { 
      setStatusTekst("op Save geklikt")
      // nog een commando
    } 

    const [statusTekst, setStatusTekst] = useState("niet aangepast");
  
    const handleShow = () => setShow(true);
    const [id, setID] = useState(props.song['id']);
    const [title, setTitle] = useState(props.song['title']);
    const [artist, setArtist] = useState(props.song['artist']);
    const [videoURL1, setVideoURL1] = useState(props.song['videoURL1']);
    const [musicSheetURL1, setMusicSheetURL1] = useState(props.song['musicSheetURL1']);
    const [download1, setDownload1] = useState(props.song['download1']);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          <FaEdit size={20}/> {" "}
         {/* // class="fas fa-pencil-alt fa-fw" */}
          <span className="small"> {props.song['order1']} </span> 
        </Button>
  
        <Modal show={show} onHide={handleClose} active={true} backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>{props.song['song']}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Table responsive striped bordered="true" hover size="sm" variant = "dark">
              <thead> 
                <tr> <th width={'14%'}> item </th> <th> item </th> </tr>
              </thead>
              <tbody>
                <tr>
                  <td> id:</td><td>
                    <input className= "small" type="text"  
                      value = {id} 
                      onChange= {((event) => {setTitle(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> titel:</td><td>
                    <input className= "small" type="text"  
                      value = {title} 
                      onChange= {((event) => {setTitle(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> artist:</td><td>
                    <input className= "small" type="text"  
                      value = {artist}
                      onChange= {((event) => {setArtist(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> video1:</td><td>
                    <input className= "small width95"  type="text"  
                      value = {videoURL1} 
                      onChange= {((event) => {setVideoURL1(event.target.value)})}
                    />
                  </td>
                </tr> 
                <tr>
                  <td> chords1:</td><td>
                    <input className= "small width95" type="text"  
                      value = {musicSheetURL1} 
                      onChange= {((event) => {setMusicSheetURL1(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> download1:</td><td>
                    <input className= "small width95" type="text"  
                      value = {download1} 
                      onChange= {((event) => {setDownload1(event.target.value)})}
                    />
                  </td>
                </tr>
              </tbody>
              </Table>
          </Modal.Body>
          <Modal.Footer>
            {statusTekst}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } export default SongDetailsModal; 