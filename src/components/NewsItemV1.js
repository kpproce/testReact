import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import NewsItemEditModal from './NewsItemEditModal';
import parse from 'html-react-parser';
import { ReplaceUrlInText } from "./ReplaceUrlInText.js"; 
import { FindUrlInText} from "./FindUrlInText.js"; 
import { Container, Col, Row, Button } from "react-bootstrap";

function imageExists(image_url){
  return true; // nog uitwerken
}

let fileInclPath = (p1,basisURL) => {
  // alert (basisURL)
  return basisURL + "images/" + p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
 }

const NewsItem = (props) => {

  const [showItem, setShowItem] = useState(
      props.role.includes("edit") || props.role.includes("admin") || props.role.includes("demo") ||
      (props.role.includes("view") &&  props.item['visibleFor'].includes("guest")) 
  )

  // demo
 
  function callBack() {    
    // setChildChanged(true);
    // alert('callBack angeroepen');
    // getData();
  } 

  useEffect(() => {
   
  }, [])

  return (
    <Container fluid="md" className={props.pageFilter.includes("home")?"messageContainerHome":"messageContainer"}>
    { 
      showItem?
      <Row>
        { props.role.includes("edit") || 
          props.role.includes("admin") || 
          (props.role.includes("demo") && props.pageFilter.includes("message")) ?
          <NewsItemEditModal callBack={callBack} message={props.item} username={props.username} code={props.code} role={props.role}/>:""  
        }
        <Col  xs={12} md={6} lg={7}>  
          <span className="xSmall"> 
            {props.item['date']} {"  - "} 
            bron: {props.item['bron']} {"  - "} 
            voor: {props.item['visibleFor']?props.item['visibleFor']:""}
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
            {// parse(FindUrlInText(props.item['message'],true))
            }
          </>
          : 
            <span className="bigger red">no rights to see message</span>
          } 
          <br/>
          <span className="xSmall down">
             message type: {props.item['page']} 
          </span> 
        </Col>
        <Col xs={12} md={5} lg={4}>      
          {props.item['image'].includes("https")?
            <img width="100%" src={props.item['image']}/> 
          : imageExists(fileInclPath(props.item['image'], props.basisURL))?
              <img width="100%" src={ fileInclPath(props.item['image'], props.basisURL)}/> 
            : fileInclPath(props.item['image'], props.basisURL)}
        </Col>
       </Row>
       : "" 
    }     
    </Container>
  )
}

export default NewsItem;