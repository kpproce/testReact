import React from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'
import NewsItems from './NewsItemsV1'
import './basis.css';

class About extends React.Component {
  
  render () {
    return (
      <>
        <Container fluid="md" className="messageContainer">
                
            <Row xs={12} md={7} lg={8} className="row">
              <Col xs={12} md={6} lg={6} className="col">      
                <h4><b>Silvermusic</b> en de website</h4>
            
                <p><b>Silvermusic</b> is een door de provincie en gemeente ondersteund project om mensen in de wijk dichter bij elkaar te brengen. </p>
                <p>Belangrijkste <b>doel van de website is</b>: <br/>
                     1) Songs afstemmen, wat spelen we, welke afspraken, welke versie, linkjes naar (zelf aangepaste) bladmuziek.
                <br/>2) news en media delen over ons, zie News. 
                <br/>3) planning (komt nog).<br/><br/>
                <p>Je kunt inloggen als <b>demo, guest of beheer</b> als demo kun je demo-data wijzigen en wat meer features van de website bekijken. Je krjgt dan bijv. edit knoppen bij Songs en News. </p>
                </p>
                <p>Interesse om mee te doen? mail Hans jhjmvos@gmail.com  <img width= "10%" src={process.env.PUBLIC_URL + '/images/2020-09-10 Hans on percussion.jfif'} alt="2020-09-10 Hans on percussion" /></p>
              </Col>
              <Col xs={12} md={6} lg={6} className="col">    
              <h4>Techniek <span className="xSmall">(in progress, warnings worden nog opgelost)</span></h4> 
                <li>Site gebouwd door Kim Proce als <b>Portfolio</b></li> 
                <li>Gebouwd met <b>REACT</b> (hooks) en diverse API's in PHP. 
                Alle API's checken op username en Accesscode in de database. 
                    De API's geven ook allemaal leesbare procesinformatie terug. 
                    In de meeste gevallen worden ook info over rechten met de data terug gestuurd. </li> 
                <li>Er is bewust gekozen om <b>niet</b> met accounts te werken, wel met een <b>logincode</b>, 
                    iedere API call geeft Username en <b>Accesscode</b> (password) mee, 
                    die wordt door de API gecheckt op rechten.</li> 
                <li> <b>videos</b> staat op youtube in een private omgeving.</li>
                <li> Er is voor de <b>doelgroep (50+)</b> ook gekozen voor een <b>vast menu</b> </li>
                <li> <b>afbeeldingen</b> staan op diverse plekken. Zoals Cloudenary of een gedeelde googledrive. 
                Je kunt ze ook uploaden  naar de site (als je beheerders rechten hebt) </li>
                <li> De site werkt met <b>user rollen</b>. Een beheerder kan news en songs aanpassen. 
                Als je de eerste keer op de site komt wordt je guest, met accesscode (password) 10</li>
              </Col>
              
            </Row>    
            <Row xs={1} md={1}  className="row">
              {/* <NewsItems pageFilter="about" newButton={false}/> */}
            </Row>
        </Container>
      </>
   )
  }
}

export default About  