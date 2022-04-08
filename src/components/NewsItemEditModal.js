import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import { FaEdit} from 'react-icons/fa';
import ListFileNamesViaAPI from './ListFileNamesViaAPI';
import UploadModal from './UploadModal';

function NewsItemEditModal(props) {
    
    const [show, setShow] = useState(false);

  /*   const [code, setCode] = useState(() => {
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
    }); */
    
    //id, bron, date, title, message, image, page, visibleFor, demo, deleted
    const [username, setUsername] = useState(props.username);
    const [code, setCode] = useState(props.code);
    const [statusTekst, setStatusTekst] = useState("niet aangepast");
    const [id, setID] = useState(props.message['id']);
    const [newOrUdate, setNewOrUdate] = useState("update");
    const [bron, setBron] = useState(props.message['bron']);
    const [date, setDate] = useState(props.message['date']);
    const [title, setTitle] = useState(props.message['title']);
    const [message, setMessage] = useState(props.message['message']);
    const [image, setImage] = useState(props.message['image']);
    const [page, setPage] = useState(props.message['page']);
    const [visibleFor, setVisibleFor] = useState(props.message['visibleFor']);
    const [demo, setDemo] = useState(props.message['demo']);
    const [deleted, setDeleted] = useState(props.message['deleted']);
    //const [download1, setDownload1] = useState(props.song['download1']);

    let updateUrl=""
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      updateUrl = "http://localhost/php_api_test/apiBasic/updateMessage.php"
    else 
      updateUrl = "https://silvermusic.nl/test/apiBasic/updateMessage.php"

    // code, id, bron, date, title, message, image, page, visibleFor, demo, deleted
    
    const newsItem =  {username, code, id, bron, date, title, message, image, page, visibleFor, demo, deleted, newOrUdate} 

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(newsItem)
    };
  
    const handleSave = () => {
      setStatusTekst("op Save geklikt")
      // POST request using axios inside useEffect React hook
      fetch(updateUrl, requestOptions)
      .then((res) => {
        if (!res.ok) { 
          throw res;  }
        return res.json()
      })
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
      props.callBack();
    }

    const handleClose = () => { 
      props.callBack();
      // alert("deleted" + deleted)
      setShow(false); 
      window.location.reload();
    };

    const handleFileNameChanged  = (fileName) => { 
      // toegevoegd 2022 kies img uit map images
      setImage(fileName)
    };

    const handleSaveAndClose = () => { 
      handleSave();
      handleClose(); 
    };

  

    return (
      <>
        <Button className="addItemButton" onClick={(setShow)}>
          <FaEdit size={15}/> {" "}
         {/* // class="fas fa-pencil-alt fa-fw" */}
         
        </Button>
  
        <Modal show={show} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title><span className="small">id: {props.message['id']}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Table responsive striped bordered="true" hover size="sm" >
              <thead> 
                <tr><th className="messageColHead" width={'20%'}> item </th ><th className="messageColHead" > waarde </th></tr> 
              </thead>
              <tbody>
                {// code, id, bron, date, title, message, image, page, visibleFor, demo, deleted
                }
                <tr>
                  <td> bron:</td><td>
                    {"role owner: "} {props.role}{" role now: "}{window.localStorage.getItem('username')?window.localStorage.getItem('username').replace(/['"]+/g, ''):"guest" }
                  </td>
                </tr>
                <tr>
                  <td> date:</td><td>
                    <input className= "small" type="text"  
                      value = {date} 
                      onChange= {((event) => {setDate(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> title:</td><td>
                    <input className= "small" type="text"  
                      value = {title} size={56}
                      onChange= {((event) => {setTitle(event.target.value)})}
                    />
                  </td>
                </tr>  
                <tr>
                  <td> message:</td><td>
                    <textarea
                      cols = "45"
                      rows = "4"
                      value =  {message}
                      onChange= {((event) => {setMessage(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> image:</td><td>
                    <input className= "small" type="text"  
                      value = {image} size={56}
                      onChange= {((event) => {setImage(event.target.value)})}
                    />
                      <ListFileNamesViaAPI  callbackFileChanged ={handleFileNameChanged} selectedStart={image} />
                  </td>
                </tr>
                <tr>
                  <td> page:</td><td>
                    <input className= "small" type="text"  
                      value = {page} size={56}
                      onChange= {((event) => {setPage(event.target.value)})}
                    />
                  </td>
                  </tr>
                  <tr>
                  <td> page:</td><td>
                    <select  
                      value = {page} 
                      onChange= {((event) => {setPage(event.target.value)})}
                    >
                      <option value="message">message page</option>
                      <option value="home">home page</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>visble For:</td><td>
                  {demo===0||props.role==="admin"?
                    <select 
                      value = {visibleFor?visibleFor:""}
                      onChange= {((event) => {setVisibleFor(event.target.value)})}
                    >
                      <option value="guest">Guest</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin (and you)</option>
                    </select>
                  : visibleFor?visibleFor:""
                  }  
                  </td>
                </tr>
                <tr>
                  <td> demo:</td><td>
                    {demo===1&&!props.role==="admin"?
                      "demo "
                    :
                      <input type="checkbox"
                        onChange= {((event) => {setDemo(event.target.checked?1:0)})}
                        defaultChecked={demo}/>
                    }
                  </td>
                </tr>
                <tr>
                  <td> deleted:</td><td>
                  <input type="checkbox"
                    //onChange= {((event) => {alert(event.target.checked)})}
                    onChange= {((event) => {setDeleted(event.target.checked?1:0)})}
                    defaultChecked={deleted}/>
                  </td>
                </tr>
              </tbody>
              </Table>
          </Modal.Body>
          <Modal.Footer className = "modalFooterLeft">
            <span className = "small">{statusTekst}</span>
            <Button variant="secondary"  onClick={handleClose}>
              Sluit
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Opslaan
            </Button>
            <Button variant="primary" onClick={handleSaveAndClose}>

              Sla op en sluit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } export default NewsItemEditModal; 