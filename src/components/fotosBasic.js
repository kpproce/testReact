import React from 'react';

import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import JSONdata from '../data/songs2.json';
import './songList.css';

class fotoBasic extends React.Component {

  filenamePart = (p1) => {
    return p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
  
  fileInclPath = (p1) => {
    return "../images/" + p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
// *****************************************
render () {
  
  return (
    <>
    <CardGroup>
      { JSONdata.ImageList.map((item)=> 
        <Card className="minWidth3">
          <Card.Img variant="bottom" src={process.env.PUBLIC_URL + '/images/'+this.filenamePart(item.imageName) } />
          <Card.Body>
            <Card.Title></Card.Title>
          <Card.Text>
             {this.filenamePart(item.imageName)}<br/>
             </Card.Text>
          </Card.Body>
        </Card>
      )}
       </CardGroup>
    </>

    )
  }
}

export default fotoBasic 



