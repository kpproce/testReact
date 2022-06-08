import React, {useState, useEffect} from 'react';
import { Modal, Table, Col, Row, Button} from "react-bootstrap";
import { FaEdit} from 'react-icons/fa';
import {FindUrlInText} from './FindUrlInText.js';
import ImageSelect from './ImageSelect.js';


import UploadModal from './UploadModal';

function NewsItemEditModal(props) {
    
    const [show, setShow] = useState(false);
     //id, bron, date, title, message, image, page, visibleFor, demo, deleted
    const [username, setUsername] = useState(props.username); 
    const [code, setCode] = useState(props.code);
    const [groupName, setGroupName] = useState(props.groupName);
    const [parentName, setParentName] = useState(props.parentName);
    const [groupNameList, setGroupNameList] = useState(props.groupNameList);
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

    const [mediaTitle, setMediaTitle]   = useState("no title")
    const [mediaUrl, setMediaUrl]       = useState("-")
    const [mediaOnPage, setMediaOnPage] = useState("home")
    //const [download1, setDownload1] = useState(props.song['download1']);
    const [fileListData, setfileListData] = useState(null)

    let updateUrl=""
    
    let updateMediaUrl=""
    const hostName = window.location.host
    if (hostName.includes("localhost"))  {
      updateUrl = "http://localhost/php_api_test/apiBasic/updateMessage.php";
      updateMediaUrl = "http://localhost/php_api_test/apiBasic/writeYoutubeLink.php";
    } else { 
      updateUrl = "https://silvermusic.nl/test/apiBasic/updateMessage.php";
      updateMediaUrl = "https://silvermusic.nl/test/apiBasic/writeYoutubeLink.php";
    }

    // code, id, bron, date, title, message, image, page, visibleFor, demo, deleted
  
    let mediaItem =  {username, code, title, mediaUrl, groupName, mediaOnPage} 

    const handleSave = () => {
      setStatusTekst("op Save geklikt")
      // POST request using axios inside useEffect React hook
       
      const newsItem =  {username, code, groupName, id, bron, date, title, message, mediaUrl, image, page, visibleFor, demo, deleted, newOrUdate} 

      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(newsItem)
      }
      console.log('NewsItemEditModal ' + title)
     
      // alert(FindUrlInText(message,true) + " title: " + title + "\nmediaUrl: " + mediaUrl + "\nmediaItem[mediaUrl]: " + mediaItem['mediaUrl'])
      mediaItem =  {username, code, title, mediaUrl, mediaOnPage} 
     
      let requestOptionsMediaUrl = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify(mediaItem)
      };

        fetch(updateUrl, requestOptions)
        .then((res) => {
          if (!res.ok) { 
            throw res;  }
          return res.json()
        }) 

        fetch(updateMediaUrl, requestOptionsMediaUrl)
        .then((resMed) => {
          if (!resMed.ok) { 
            throw resMed;  }
          return resMed.json()
        })
        

      // empty dependency array means this effect will only run once (like componentDidMount in classes)
      props.callBack();
    }

    const handleClose = () => { 
      props.callBack();
      // alert("deleted" + deleted)
      setShow(false); 
      window.location.reload(); // dit moet beter via callback en useeffect in parent
    };

    const handleSaveAndClose = () => { 
      handleSave();
      handleClose(); 
    };

    function callBackFromImageSelect(imagename) {
      setImage(imagename);
    }


/*     const callBackFromImageSelect = (imagename) => {
          };
 */
    const callBackFileUpload = (imagename) => { // niet meer in gebruik
      setImage(imagename);
      //alert("hier langs gekomen 2 ");
      // this.setState(); niet gebruiken
      // Hier moeten we de lijst met namen ook opnieuw ophalen. 
      // alert("callBackImageUpload aangeroepen met " + imagename + " -- " + image);
    };

    const handleFileSelect = (fileName) => {
      setImage(fileName);
      // alert(fileName)
    }

    function addParentSrc(ev){
      ev.target.src = props.basisURL + 'images/' + parentName + '/' + image 
      ev.target.alt = props.basisURL + 'images/' + parentName + '/' + image 
    }

    
    useEffect(() => {
      

    })

    // *********************************************************************
    
    return (
      <>
        <Button className="addItemButton" onClick={(setShow)}>
          <FaEdit size={15}/> {" "}
         {/* // class="fas fa-pencil-alt fa-fw" */}
         
        </Button>
  
        <Modal animation={false} dialogClassName="newsEditModalStyle" show={show?true:false} onHide={handleClose} active="true" backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title><span className="small">id: {props.message['id']}</span></Modal.Title>

            <Button variant="secondary" className="marginLeft5 marginRight5" onClick={handleClose}>
              Sluit
            </Button>

            <Button variant="primary" className="marginLeft5 marginRight5" onClick={handleSaveAndClose}>
              Sla op en sluit
            </Button>
          </Modal.Header>
          <Modal.Body>
             <Table responsive striped bordered="true" hover size="sm" >
              <tbody>
                {// code, id, bron, date, title, message, image, page, visibleFor, demo, deleted
                }
                <tr>
                  <td> bron:</td>
                  <td colSpan="2">
                    {"role owner: "} {props.role}{" role now: "}{window.localStorage.getItem('username')?window.localStorage.getItem('username').replace(/['"]+/g, ''):"guest" }
                  </td>
                </tr>
                <tr>
                  <td> date:</td>
                  <td colSpan="2">
                    <input className= "small" type="text"  
                      value = {date} 
                      onChange= {((event) => {setDate(event.target.value)})}
                    />
                  </td>
                </tr>
                <tr>
                  <td> title:</td>
                  <td colSpan="2">
                    <input className= "small width95" type="text"  
                      value = {title}
                      onChange= {((event) => {setTitle(event.target.value)})}
                    />
                  </td>
                </tr>  
                <tr>
                  <td> message:</td>
                  <td colSpan="2">
                    <textarea className='width95'
                      cols = "34"
                      rows = "4"
                      value =  {message}
                      onChange= {((event) => {
                          setMessage(event.target.value)
                          setMediaUrl(FindUrlInText(message,true))
                        })}
                    />
                  </td>
                </tr>
                <tr>
                  <td> mediaUrl:</td>
                  <td className="xSmall" colSpan="2"> {mediaUrl} </td>
                </tr>
                <tr>
                  <td> image:</td>
                  <td>
                    <input className= "small" type="text"  
                      value = {image} size={33}
                      onChange= {((event) => {setImage(event.target.value)})}
                    />
                    <UploadModal parentName={parentName} groupName={groupName} callBackFileUpload={callBackFileUpload} selectedStart={image}/>
                    <ImageSelect code={code} image={image} basisURL={props.basisURL} parentName={parentName} groupName={groupName} imageList={props.imageList} callBackFromImageSelect={callBackFromImageSelect}/>
                  </td>
                  <td className='minWidth75P maxWidth200P'> 
                    {/* <img alt= {image} className="messageImg" src={props.basisURL + 'images/' + parentName + '/' + groupName + '/' + image }/> */}
                    <img alt= {image} className="messageImg" onError={addParentSrc} src={props.basisURL + 'images/' + parentName + '/' + groupName + '/' + image } alt={image}/> 
                  </td>
                </tr>

                <tr>
                  <td>waar:</td>
                  <td colSpan="2">
                    <input className= "small" type="text"  
                      value = {page} size={13}
                      onChange= {((event) => {setPage(event.target.value)})}
                    />
                    <select className="width50"  
                      value = {page} 
                      onChange= {((event) => {setPage(event.target.value)})}
                    >
                      <option value="message">message page</option>
                      <option value="home">home page</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td> groupName:</td>
                  <td colSpan="2">
                  <select 
                    value = {groupName?groupName:""}
                    onChange= {((event) => {setGroupName(event.target.value)})}
                    >
                    {props.groupNameList.map((groupNameFromList) => (
                      <option value={groupNameFromList}>{groupNameFromList}</option> 
                    ))}
                  </select>    
                  </td>
                </tr>
                <tr>
                  <td>wie ziet:</td>
                  <td colSpan="2">
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
                  <td> deleted:</td>
                  <td colSpan="2">
                  <input type="checkbox"
                    //onChange= {((event) => {alert(event.target.checked)})}
                    onChange= {((event) => {setDeleted(event.target.checked?1:0)})}
                    defaultChecked={deleted}/>
                  </td>
                </tr>
              </tbody>
              </Table>
          </Modal.Body>
         {/*  <Modal.Footer className = "modalFooterLeft">
         
          </Modal.Footer> */}
        </Modal>
      </>
    );
  } export default NewsItemEditModal; 