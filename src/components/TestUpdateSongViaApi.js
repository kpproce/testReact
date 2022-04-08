import React from 'react';
import axios from "axios";
import { Table, Col, Row, Button } from "react-bootstrap";


// dit component krijgt data door voor een message. Dat maakt het mogelihk dit component te gebruiken voor een bestaande message of een nieuwe.
// als een id wordt doorgegeven dan is het de bedoeling dat die id niet wordt aangepast, zodat een bestaande message wordt overschreven. 

    const api = axios.create({
        // baseURL: 'http://localhost/php_api_test/apiBasic/writeMessage.php'
        baseURL: 'http://localhost/php_api_test/apiBasic/updateSongInPlaylist.php'
    })

class TestUpdateSongViaApi extends React.Component {
  constructor(props) {
    super();
    this.state = {
        id: "1",
        title: "sultans of swing2",
        result: "--"
    }
    // alert ("component JWT Constructor props: modus: " + this.state.modus + " imageName: " + this.state['imageName']+ " id" + this.state['id'])
    // alert("constr JWT: title: " + this.state.title + " -- imagename: " + this.state.imageName +  " props.lastItem['image'] :" + props.lastItem['image'])
  }
  
  
  execAPIPost = async () => {
    // sla de message op in de databsse (tabel messages)
    // als een id al bestaat wordt deze verwijderd en deze nieuwee geplaatst

    var { id, title, result} = this.state;
    let res = await api.post('/',{
      id: id,
      title: title
    })
    if(res.status == 200){
      this.setState({result: res.data} )
      console.log(" ------- UpdateSong via API AXIOS --------");
      console.log(res.data)
      console.log(" ------- EINDE   UpdateSong via API AXIOS --------");
    }    
   
    // result?this.setState({result:"+"+result+ "+"} ):this.setState({result: "test niet gelukt"} )
    // alert("opslaan message: \ntitle: " + title + " imageNeme: " + imageName + " via lastItem: " + lastItem['image'] + "  result:" + res.data['message'])
  
  }

    render () {
        var { modus, id, title, message, bron , page , imageName, result} = this.state;
        const titleText = modus=="new"? "Nieuwe Message": "Wijzig Message " + id; 

        return (
          <>
            <button onClick= {() =>  this.execAPIPost()}>
              Click me 24
            </button>
            {result}
          </>
        )
    }
}

export default TestUpdateSongViaApi