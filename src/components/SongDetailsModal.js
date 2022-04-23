import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
// import TestUpdateSongViaApi from './TestUpdateSongViaApi';
import { FaEdit} from 'react-icons/fa';
import ListFileNamesViaAPI from './ListFileNamesViaAPI';
import UploadModal from './UploadModal';

function SongDetailsModal(props) {    
    const [show, setShow] = useState(false);
    const [articleId, setArticleId] = useState(null);
    
    // const [id, setId] =  useState(1);
    // const [title, setTitle] =  useState("this song");
    const [response, setResponse] = useState(null);
    
    const [statusTekst, setStatusTekst] = useState("niet aangepast");
    const handleShow = () => setShow(true);
    const [id, setID] = useState(props.song['id']);
    const [order1, setOrder1] = useState(props.song['order1']);
    const [title, setTitle] = useState(props.song['title']);
    const [artist, setArtist] = useState(props.song['artist']);
    const [afspraken, setAfspraken] = useState(props.song['afspraken']);
    const [videoURL1, setVideoURL1] = useState(props.song['videoURL1']);
    const [musicSheetURL1, setMusicSheetURL1] = useState(props.song['musicSheetURL1']);
    const [download1, setDownload1] = useState(props.song['download1']);
   
    const [code, setCode] = useState(() => {
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

    let updateUrl=""
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      updateUrl = "http://localhost/php_api_test/apiBasic/updateSongV2.php"
    else 
      updateUrl = "https://silvermusic.nl/test/apiBasic/updateSongV2.php";

    const song =  {code, id, order1, title, artist, afspraken, videoURL1, musicSheetURL1, download1} 

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(song)
    };
  
    const handleSave = () => {
      setStatusTekst("op Save geklikt")
      // POST request using axios inside useEffect React hook
      fetch(updateUrl, requestOptions)
      .then((res) => {
        if (!res.ok) { 
          throw res;  }
        return res.json()

        // .then(response => setResponse(res.data))
    })
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
      props.callBack();
    }

    const handleClose = () => { 
      props.callBack();
      setShow(false); 
    };
    function callBackSFN(fileName) {
      setDownload1(fileName)
      // alert(download1)
    }

    const handleFileNameChanged  = (fileName) => { 
      setDownload1(fileName)
    };

    const callbackSelectedFilenameChanged  = (fileName) => { 
      // aangeroepen vanuit child als een andere filename is gekozen in andere select, 
      // kan ook aangeroepen worden na een upload. 
      setDownload1(fileName)
    };
    
    
    const callBackFileUpload  = (fileName) => { 
      setDownload1(fileName)
    };

    const handleSaveAndClose = () => { 
      handleSave();
      handleClose(); 
    };

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          <FaEdit size={20}/> {" "}
         {/* // class="fas fa-pencil-alt fa-fw" */}
          <span className="small"> {props.song['order1']} </span> 
          
        </Button>
  
        <Modal show={show} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title className="xSmall" >{props.song['song']}{"id: "}{id}</Modal.Title>
            &nbsp;&nbsp;
            <Button variant="secondary"  onClick={handleClose}>
              Sluit
            </Button>             
            &nbsp;&nbsp;
            <Button variant="primary" onClick={handleSaveAndClose}>
              Sla op en sluit
            </Button>
          </Modal.Header>
          <Modal.Body>
             <Table responsive striped bordered="true" hover size="sm" >
              <thead> 
                <tr><th width={'14%'}> item </th><th> waarde </th></tr>
              </thead>
              <tbody>
                <tr>
                  <td> volgorde:</td><td>
                    <input className= "small" type="text"  
                      value = {order1} 
                      onChange= {((event) => {setOrder1(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> titel:</td><td>
                    <input className= "small" type="text"  
                      value = {song.title} 
                      onChange= {((event) => {setTitle(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> artist:</td><td>
                    <input className= "small" type="text"  
                      value = {song.artist}
                      onChange= {((event) => {setArtist(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td>afspraken:</td><td>
                    <input className= "small" type="text"  
                      value = {song.afspraken}
                      onChange= {((event) => {setAfspraken(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> video:</td><td>
                    <input className= "small width95"  type="text"  
                      value = {song.videoURL1} 
                      onChange= {((event) => {setVideoURL1(event.target.value)})}
                    />
                  </td>
                </tr> 
                <tr>
                  <td> chords:</td><td>
                    <input className= "small width95" type="text"  
                      value = {song.musicSheetURL1} 
                      onChange= {((event) => {setMusicSheetURL1(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> download:</td>
                  <td>
                    <input className= "small width95" type="text"  
                      value = {song.download1} 
                      onChange= {((event) => {setDownload1(event.target.value)})}
                    />
                     {/* <ListFileNamesViaAPI  callbackFileChanged ={handleFileNameChanged} selectedStart={song.download1} /> */}
                     <ListFileNamesViaAPI callBackSFN={callBackSFN} 
                        selectedStart={song.download1} />
                      {' '}
                     <UploadModal callBackFileUpload={callBackFileUpload} 
                        selectedStart={song.download1}/>
                  </td>
                </tr>
              </tbody>
              </Table>
          </Modal.Body>
          <Modal.Footer className = "modalFooterLeft">
            <Button variant="secondary"  onClick={handleClose}>
              Sluit
            </Button>
            <Button variant="primary" onClick={handleSaveAndClose}>
              Sla op en sluit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } export default SongDetailsModal; 