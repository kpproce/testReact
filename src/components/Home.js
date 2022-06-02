import React, {useState, useEffect} from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
import ReactPlayer from 'react-player'
import NewsItems from './NewsItemsV1'
import MediaRandom from './MediaRandom';
import './basis.css';

const styles = {
    homeContainer: {
        height: 1356,
        backgroundImage: `url(${"/testreact/images/2020-09-10 Eerste oefensessie overzicht.jfif"})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },

    content: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(250, 250, 250, 0.8)',
    }
};

const Home = (props) => {
// class Home extends React.Component {
 
  const [basisURL, setBasisURL] = useState(() => {
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/"
    else 
      return "https://silvermusic.nl/test/apiBasic/"
  });
  
    return (
      <div style={styles.homeContainer}>
        <Container style={styles.content} fluid="md">
            <Row xs={1} md={1}  className="row">
                <h4 className="respFontSize"> Muzikale Verbinding Zilverkamp Huissen</h4>
               
            </Row>
        
            <Row className="row">
              <Col xs={12} md={9} lg={7} className="col">     
                <MediaRandom username='guest' code='10'/>
              </Col>
              <Col xs={12} md={3} lg={5} className="col">     
                  <img width= "100%" src={basisURL + 'images/' + props.parentName  + '/InteresseMailHans.jpg'} alt="Interesse? mail Hans jhjmvos@gmail.com" />
                  <a href="https://www.zilverkamphuissen.nl/wop/werkgroep-muziek">zie ook de website zilverkamp</a>
            </Col>

            </Row>    
            <Row xs={1} md={1}  className="row">
              <NewsItems pageFilter="home" groupNameList={props.groupNameList} parentName={props.parentName} groupName={props.groupName} newButton={false}/>
            </Row>
        </Container>
      </div>
    )
}


export default Home  