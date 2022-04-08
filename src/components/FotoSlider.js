import React from 'react';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { findFotoURL } from "./tool_fotoUrl.js"; 

class FotoSlider extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      items: []
    }
  }

  componentDidMount() {
    fetch('http://localhost/php_api_test/apiBasic//readFotoNames.php')
    
    .then(res => res.json())
      .then(json => {
        this.setState({ 
          isLoaded: true,
          items: json
        },
        console.log(this.setState.items)
        )
      })
  }


// *****************************************
  render () {
    var { isLoaded, items } = this.state;
      
    if (!isLoaded) {
      return <div>Loading .... </div>
    } 
    else {
      return (
        <div> 
          { 
          <AwesomeSlider>
            { 
              items.map((item, index)=> {
                return (
                  <div data-src={"http://localhost:9000/testAPI/images/" + item['image']}/> 
                )
              })
            }     
          </AwesomeSlider>  
          }
          
          }
        </div>
      )
    } 

  }





}

export default FotoSlider 

