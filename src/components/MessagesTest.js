import React from 'react';
import './songList.css';


import { Button } from 'react-bootstrap';

// ----- MESSAGES dit is het component om messages om en om te laten zien

class Messages extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoaded: false,
      rer: "leeg",
      items: [],
      filter: '',
    }
  }

  // This is the best place to make API calls since, at this point, 
  // the component has been mounted and is available to the DOM.

  componentDidMount() {
    //fetch('https://jsonplaceholder.typicode.com/users')
    this.handleFetchRead1();
  }

  handleFetchRead1 = () => {
    // fetch('http://localhost/php_api_test/apiBasic/read1.php?filter=message')
    fetch('http://www.silvermusic.nl/test/apiBasic/read1.php')
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

  handleChange(event) {
    // hiermee zorg je er voor dat this.state.value actueel blijft en die zie je in de input
    this.setState(
      {filter: event.target.value.toLowerCase()},
    );
  }

  handleRerender = () => {
    
    // this.setState({rer: "gewijzigd"}, function() {alert("Messages zijn verouderd open messages opnieuw via menu--> messages")} );
     // setTimeout(function() { this.forceUpdate();} .bind(this), 10) 
     // setTimeout(function() {this.forceUpdate()} .bind(this), 1000)
     this.handleFetchRead1();
  }

  render () {
    
    var { isLoaded, rer, items, showModal } = this.state;
    
    if (!isLoaded) {
      return <div>Loading .... </div>
    } 
    else {
      return (
        <>  
          Filter messages: <input type="text" value={this.state.filter} onChange={(e) => this.handleChange(e)}/><br/>
          {
            items.filter(item => (item.title.toLowerCase().includes(this.state.filter) || item.id.toLowerCase().includes(this.state.filter))).map((item, index)=> {
              return (  
                <>
                {item['title']}   {item['message']} 
                <br/>  <br/>
                </>
               )
            })
          }
        </>
      )
    } 
  }
}

export default Messages;