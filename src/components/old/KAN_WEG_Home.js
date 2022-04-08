import React from 'react';
import MessageItem from './MessageItem2';
import parse from 'html-react-parser';
import { findURL1 } from "./tool_findURLinText.js"; 
import { Container, Col, Row, Button } from "react-bootstrap";
import './basis.css';


// GITHUB kpproce


class Home extends React.Component {

  // deze is redelijk verouderd. Moet nog: via API direct filteren... en betere foutmelding

  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      items: [],
    }
  }

  showState = () => {
    const obj = this.state.items.find(obj => obj.id == "homeTitle1" );

    this.setState((state) => {
      let txt = "text aangepast" 
      return { homeTitle1: { txt}  }
    })
  }

  componentDidMount() {
    //fetch('https://jsonplaceholder.typicode.com/users')
    fetch('http://localhost/php_api_test/apiBasic/read1.php')
    .then(res => res.json())
    .then(json => {
        this.setState({ 
            isLoaded: true,
            items: json,
            homeTitle1: "ingelezen"
        }, 
        console.log("************** " + this.items)
    )})
  }

  fileInclPath = (p1) => {
    return "http://localhost:9000/testAPI/images/" + p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }

  getItem= (filterID) => {
    var ret = {result:(filterID + " niet gevonden 1"), item:{}} 
    this.state.items.filter(item => item.id.includes(filterID)).map((item)=> {
      ret = {result:("gevonden"), item} 
    })

    return ret 
  }

  getInfo = (filterRow,filterColumn) => {
    // items is een array met assiative array, zoals een standaard tabel.
    // met deze functie haal je de waarde van een cel op
    // in principe kunen  meerdere regels voldoen aan filterRow, je krijgt dan de laatste 
    var { items } = this.state;
    var ret = filterColumn + ": " + filterRow + " bestaat niet als message, maak deze aan";
   
    items.filter(item => item.id.includes(filterRow)).map((item, index)=> {
      ret = item[filterColumn];

    })
    // console.log("filterRow: " + filterRow + " filterCol: " + filterColumn  + " ret: " + ret)
    return ret
  }

  getInfoURL = (filterRow,filterColumn) => {
    // zelfde als getInfo maar dan 
    var { items } = this.state;
    var ret = filterColumn + ": " + filterRow + " bestaat niet als message, maak deze aan";
   
    items.filter(item => item.id.includes(filterRow)).map((item, index)=> {
      ret = item[filterColumn];
    })
    // console.log("filterRow: " + filterRow + " filterCol: " + filterColumn  + " ret: " + ret)
   
    ret = parse(findURL1(ret))
    return ret
  }

  render () {
    var { isLoaded, items } = this.state;
    let item =   this.getItem("homeBody1")

    if (this.state.isLoaded) 
    return (
      <Container fluid="md">
           <Row xs={1} md={1}  className="row">
              <h1> {this.getInfo("homeTitle1", "title")} </h1>
          </Row>
          <Row xs={1} md={2} className="row">
            <Col xs={12} md={8} lg={9} className="col">      
              <h4> {this.getInfoURL("homeTitle1", "message")} </h4>
            </Col>
            <Col xs={6} md={4} lg={3} className="col">        
              <img width="60%" src= {this.fileInclPath(this.getInfo("homeTitle1", "image"))}/> 
            </Col>  
          </Row>

          <Row xs={1} md={2} className="row">
              <h2> {this.getInfo("homeBody1", "title")} </h2>
          </Row>
          <Row xs={1} md={2} >
            <Col xs={12} md={8} lg={9} className="col">      
              <h4> {this.getInfoURL("homeBody1", "message")} </h4>
            </Col>
            <Col xs={6} md={4} lg={3} className="col">        
              <img width="10%" src= {this.fileInclPath(this.getInfo("homeBody1", "image"))}/> 
            </Col>  
          </Row>

          <Row xs={1} md={2} className="row">
              <h2> {this.getInfo("homeBody2", "title")} </h2>
          </Row>
          <Row xs={1} md={2} >
            <Col xs={12} md={8} lg={9} className="col">      
              <h4>{this.getInfo("homeBody2", "message")}</h4>
            </Col>
            <Col xs={6} md={4} lg={3} className="col">        
              <img width="20%" src= {this.fileInclPath(this.getInfo("homeBody2", "image"))}/> 
            </Col>  
          </Row>
     
        
 
      </Container>

   ); else  {return "</>" } ;
  }
}

export default Home  