import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
//import NewsItemEditModal from './NewsItemEditModal';
import NewsItemEditModal from './NewsItemEditModal_V2';
import YoutubeLink from './YoutubeLink.js';

import parse from 'html-react-parser';
import { ReplaceUrlInText } from "./ReplaceUrlInText.js"; 
import { FindUrlInText} from "./FindUrlInText.js"; 
import { Container, Col, Row, Button } from "react-bootstrap";

function imageExists1(image_url){
  return true; // nog uitwerken
}

var imgExists = "----";



/*

function checkImage(imageSrc, good, bad) {
//  function checkImage(imageSrc) {
    var img = new Image();
     // img.onload = good;
    img.onload = () => {returnValue = true; alert("Gevonden " )}
 
    img.onerror = bad;
    // img.onerror = () => {returnValue = false; alert("NIET Gevonden " )}
    img.src = imageSrc;
    //return returnValue;
}
function imageExists(imageSrc){
  let returnValue = false;
  checkImage(imageSrc, function(){ this.imgExists = "goed" ; alert("goed: " + imageSrc); }, function(){ this.imgExists = "fout" ; alert("bad: " + imageSrc); } );
  //checkImage(imageSrc, function(){ returnValue = true }, function(){ returnValue = false } );
  alert ("imgExistst: " + this.imgExists)
  return (returnValue)
} */

const NewsItem = (props) => {

  const [showItem, setShowItem] = useState(
      props.role.includes("edit") || props.role.includes("admin") || props.role.includes("demo") ||
      (props.role.includes("view") &&  props.item['visibleFor'].includes("guest")) 
  )
  const [item, setItem] = useState(props.item);
    

  const [fileInclPath, setFileInclPath]  = useState(
    props.item['image'].includes("https")? 
      props.item['image']
    :
      props.basisURL + "images/" + props.parentName + '/' + props.groupName + '/' 
      + props.item['image'].substring(  props.item['image'].lastIndexOf("/")+1,   
                                        props.item['image'].length-props.item['image'].lastIndexOf("/"))
  )

  const [fileInclParentPath, setFileInclParentPath]  = useState(
    props.item['image'].includes("https")? 
      props.item['image']
    :
      props.basisURL + "images/" + props.parentName + '/'
      + props.item['image'].substring(  props.item['image'].lastIndexOf("/")+1,   
                                        props.item['image'].length-props.item['image'].lastIndexOf("/"))
  )

  const [defFileInclPath, setDefFileInclPath] = useState (props.basisURL + 'images/imageNotFound.png')
  const [imageNotFound, setImageNotFound]  = useState(props.basisURL + 'images/imageNotFound.png')
  const [imageError, setImageError]  = useState('')
  

  function callBack() {    
    // setChildChanged(true);
    // alert('callBack angeroepen');
    // getData();
  } 

  // function checkImage(imageSrc, good, bad) {
  function checkImage(imageSrc) {
      var img = new Image();
        // img.onload = good;
      img.onload = () => {setDefFileInclPath(fileInclPath);}
      img.onerror =  setDefFileInclPath(fileInclParentPath);
      // img.onerror = () => {returnValue = false; alert("NIET Gevonden " )}
      img.src = imageSrc;
      //return returnValue;
  }

  function addDefaultSrc(ev){
    ev.target.src = imageNotFound
    ev.target.alt = imageNotFound
    setImageError( props.item['image'])
    // ev.target.alt = fileInclParentPath
    // ev.target.error = function (ev2) {ev2.src=imageNotFound}
  }

  useEffect(() => {
    checkImage(fileInclPath) 
  }, [])

  return (
    <Container fluid="md" className={props.pageFilter.includes("home")?"messageContainerHome":"messageContainer"}>
    { 
      showItem?
      <Row>
        { props.role.includes("edit") || 
          props.role.includes("admin") || 
          (props.role.includes("demo") && props.pageFilter.includes("message")) ?
          <NewsItemEditModal callBack={callBack} message={props.item} basisURL={props.basisURL} basisImageURL={props.basisImageURL} fileInclPath={fileInclPath} username={props.username} code={props.code} role={props.role} groupName={props.groupName} groupNameList={props.groupNameList} parentName={props.parentName} imageList={props.imageList}/>:""  
        }
        <Col  xs={12} md={6} lg={7}>  
          <span className="xSmall"> 
            {props.item['date']} {"  - "} 
            bron: {props.item['bron']} {"  - "} 
            {/* voor: {props.item['visibleFor']?props.item['visibleFor']:""} */}
          </span> <br/> 
          {props.item['demo']===1?<span className="xSmall">(demo data) </span>:""}
          {props.item['title']}  
          {props.role.includes("admin")?
            (props.item['deleted']===1)?<> deleted<br/></>
            :"" 
          :""} 
          {props.item['bron'].includes("demo")?<>(DEMO)</>
          :""} 
          <br/>
          {showItem? 
          <>
            {parse(ReplaceUrlInText(props.item['message'],true))}

            <YoutubeLink url="https://www.youtube.com/watch?v=yKQcVkCsoCM" message={item.message}/>

            {// parse(FindUrlInText(props.item['message'],true))
            }
          </>
          : 
            <span className="bigger red">no rights to see message</span>
          } 
          <br/>
         {/*  <span className="xSmall down">
             message type: {props.item['page']} 
          </span>  */}
        </Col>
        <Col xs={12} md={5} lg={4} className="vertMidden"  >  
          <div className="messageImgDiv">     
            {props.item['image'].includes("https")?
              <img className="messageImg" src={props.item['image']} alt={fileInclPath}/> 
            :
              <>
                <img className="messageImg" onError={addDefaultSrc} src={defFileInclPath} alt={defFileInclPath}/> 
                {imageError}
               <p clasName="xxSmall"> {imageError} </p>
              </>
            } 
          </div>
        </Col>
       </Row>
       : "" 
    }     
    </Container>
  )
}

export default NewsItem;