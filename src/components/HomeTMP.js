import React from 'react';
import { Container, Col, Row, Button } from "react-bootstrap";
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

class Home extends React.Component {


  
  render () {
    return (
      <div style={styles.homeContainer}>
        <Container style={styles.content} fluid="md">
            <Row xs={1} md={1}  className="row">
              <h1>Silvermusic <span className="xSmall"> V1.01 </span>  </h1>
            </Row>
            <Row xs={1} md={2} className="row">
              <Col xs={12} md={7} lg={8} className="col">      
                <h3>Muzikale Verbinding in Zilverkamp Huissen </h3>
                <h5>We spelen 1 keer per 2 weken. Zie ook onze 
                  <a href="https://kpproce.github.io/testreact/#/lijst" > <h4> playlist</h4> </a>
                </h5>
                <br/>

                  <a href="https://kpproce.github.io/testreact/#/player" > <h4> Videos zoals de eerste oefensessie</h4> </a>

              </Col>
              <Col xs={7} md={5} lg={4} className="col">        
              <img width="100%" src={process.env.PUBLIC_URL + '/images/2020-09-10 Eerste oefensessie overzicht.jfif'} />
              </Col>  
            </Row>

            <Row xs={1} md={2} className="row">
              <Col xs={12} md={9} lg={10} className="col">      
                <h4> Ben je geinteresseerd: neem dan contact op met Hans Vos via email: jhjmvos@gmail.com</h4>
              </Col>
              <Col xs={6} md={3} lg={2} className="col">        
              <img width="100%" src={process.env.PUBLIC_URL + '/images/2020-09-10 Hans on percussion.jfif'} />
              </Col>  
            </Row>

            <Row xs={1} md={2} className="row">
              <Col xs={12} md={9} lg={10} className="col">      
                <h4> <a href="https://kpproce.github.io/testreact/#/fotosBasic" > <h3> Klik hier voor wat foto's</h3> </a> </h4>
              </Col>
            </Row>
        </Container>
      </div>
   )
  }
}

export default Home  