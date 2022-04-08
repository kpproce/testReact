import React from 'react';
import userdata from '../data/userInfo.json';
import { Container, Col, Row, Button } from "react-bootstrap";
import parse from 'html-react-parser';
import { findURL1 } from "./tool_findURLinText.js"; 
import FetchImagesFromServerComp from './FetchImagesFromServerComp';
import JWTModal from './JWTModal';
import ImageDownload from './ImageDownload'; 
import FileUploadModal from './FileUploadModal';
import './basis.css';

class MessageItem extends React.Component {

  // Dit is een playlist weergave van de messagaitems 
  
  filenamePart = (p1) => {
    return p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
  
  fileInclPath = (p1) => {
   return "http://localhost:9000/testAPI/images/" + p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }

  handleRerender = () => {
    // rerender funtion aanroepen van parent
    this.props.handleRerender();  
      // alert("on_even re-rendering")
      // this.forceUpdate()
      // 
  }

 /*  componentDidUpdate(prevProps, prevState) {
    if (prevState.compact !== this.state.compact) {
      alert('state has changed.')
    }
  } */


// *****************************************


render () {
  const style1 = {
    border:'6px solid red',
    backgroundColor: 'red',
  } 

  // const title = this.props.title
  let  item = this.props.item
  const title = this.props.item['title'] 
  const compact = this.props.compact
  const id = this.props.item['id'] 
  const bron = this.props.item['bron'] 
  const date = new Date()
  const message = this.props.item['message']
  const imageName = this.props.item['image']
  // alert("on_even 44: " + imageName +  "title: " + title + "--image: " +  this.props.item['image']  + "--imageName: " )
  const showModal = false
 // alert ("test 12: " + imageName )

 const retMesPart0 = (
   <>
      <Col className = "col noPaddingLeft" xs={9} md={10} lg={10}>
        <Row className = "row paddingLeft ">
          <h4> { title} </h4>
        </Row>
        <Row className = "row paddingLeft ">
          {parse(findURL1(message,false))}
        </Row>
        <Row className = "row paddingLeft ">
          <JWTModal modus="update" lastItem = {item} show = {showModal} handleRerender= {this.handleRerender} />
        </Row>

        </Col>
        <Col className = "col noPaddingLeft" xs={3} md={2} lg={2}>
        <ImageDownload imageName = {item['image']} width="100%" /> 
        </Col>
    </>

  )


  const retMesPart0Compact = (
    <Col className = "col noPaddingLeft" xs={12} md={12} lg={12}>
        <h5> { title} </h5>
    </Col>
   )
 

  const retMesPart1 = (
    <></>
  )

  
  const retMesPart1Compact = (
    <Col className = "col paddingLeft" xs={12} md={12} lg={12}>   
        <Row className = "row paddingLeft smaller">
          {parse(findURL1(message,false))}
        </Row>
    </Col>
  )

 
  
  const retMesPart3 = (
    <Col className = "col extraMarginTopBottom" xs={12} md={12} lg={12}> 
      <JWTModal modus="update" lastItem = {item} show = {showModal} handleRerender= {this.handleRerender} />
    
    </Col>
) 



  // var { date, title,message,bron  } = this.state;
  return (
    <Container fluid="md" className="messageContainer">
    { 
       <>
       <Row className = "row" xs={12} md={12} > 
       {compact? retMesPart0Compact:retMesPart0} 
         
        </Row>
         <Row className = "row" xs={12} md={12} > 
       
         {compact? retMesPart1Compact:<>{retMesPart1} </>}
       </Row>
       <Row className = "row" xs={12} md={12} > 
       
        
       </Row>   
      </>
    }      
    </Container> 
        
    )
  }
}

export default MessageItem 