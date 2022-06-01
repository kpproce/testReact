import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import SongDetailsModal from './SongDetailsModal';
import PDFViewerV1 from './PDFViewerV1';
// import UploadFile from './UploadFile';
// import ListFileNamesViaAPI from './ListFileNamesViaAPI';

//  ModSecurity stond niet aan bij hostingpartij bhosted: opgelost 

// $this->username = kimproce_root password = "B4EjH9ANDbKW"; */
// Source staat op: D:\xampp\htdocs\php_api_test\apiBasic


// const stored = localStorage.getItem('code');
  
const PlayList = () => {

  const [childChanged, setChildChanged] = useState(true)
  const [data, setData] = useState(null)
  const [showAPIResNoData, setshowAPIResNoData] = useState(false) // for debug and error handling
  const [filter, setFilter] = useState("") // 
  // const [code, setCode] = useState("10") // code voor api, die geeft geen data bij foute code.
  const [debug, setDebug] = useState(false) // 

  const [code, setCode] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem('code');
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : '10';
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return '10';
    }
  });
  
  const [username, setUsername] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem('username');
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : 'guest';
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return 'guest';
    }
  });

  // check local or provider 

  let fetchURL =""
  const hostName = window.location.host
  if (hostName.includes("localhost")) 
    fetchURL = "http://localhost/php_api_test/apiBasic/listSongsV4.php"
  else 
    fetchURL = "https://silvermusic.nl/test/apiBasic/listSongsV4.php"
  
  // alert(hostName)

  const changeCode = (c) => {
    setCode(c);
    setChildChanged(true);
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({'username': username, 'code': code, 'filter':filter})
  };

    const getData = () =>
    fetch(fetchURL, requestOptions)
      .then((res) => {
        if (!res.ok) { throw res }
        return res.json()
      })

  function callBack() {    
    setChildChanged(true);
    // alert('callBack angeroepen');
    // getData();
  } 
   
  useEffect(() => {
    //alert(window.location.hostname)
    getData()
    .then((data) => setData(data))
    .then (setChildChanged(false))
    // .then(alert ('data received'))
  }, [childChanged])

  return (
    data? 
    <>
      <table border="1" className="messageContainer">
        <thead>
          <tr> <th className = 'SLTH'> </th> </tr> 
        </thead>

        <tbody>
          <tr><td  colSpan="2">
            Fllter:{" "}
            <input
              name="isGoing"
              type="checkbox"
              checked={debug}
              onChange={e => {setDebug(e.target.checked) }}
            />

            {(data["edit"])?
              <>            
              {//childChanged? 'childChanged = true' :"childChanged = false"
              }
              <button 
                className= "small width30 " 
                onClick ={ () => setshowAPIResNoData(!showAPIResNoData)}>{showAPIResNoData? 'hide APIinfo':'APIinfo'}
              </button>
            </>
            :""
            }
          </td></tr>   
          {debug?
            <> 
              <tr><td  colSpan="2">
                {"Filter"}<input className= "small width30" name="name" value={filter} onChange={e => setFilter(e.target.value)}/>
                {" "}<button className= "small width30 " onClick ={ () => setChildChanged(true)}> refresh page</button>{" "} 
              </td></tr>
            </>
            :""
          }
          {//  id	  order1	  title	  artist	  afspraken	  videoURL1	  musicSheetURL1	  musicSheetURL2	  image1	  image2
          }
          {
            data["done"] !== undefined? 
              <>
              {showAPIResNoData? // toon response van de APi hier eventueel.
                  <>
                    {// zou ook met een loop kunnen maar info is per item anders en dus niet handig
                    }
                    <tr><td>accessCodeOkay (authorisatie?){": "}
                      {data["accessCodeOkay"] !== undefined? data["accessCodeOkay"]?"Okay":"Code niet okay":"Niet door API verstuurd"}
                    </td></tr>
                    <tr><td>done (verzoek door Server uitgevoerd?){": "}
                      {data["done"] !== undefined? data["done"]?"Ja":"Nee, is wat fout gegaan":"Niet door API verstuurd"}
                    </td></tr>
                    <tr><td>message (info van server){": "}
                      {data["message"] !== undefined? JSON.stringify(data["message"]):"Niet door API verstuurd"}
                    </td></tr>
                    <tr><td> errorMessage? (bij verwerken server){": "}
                      {data["errorMessage"] !== undefined? JSON.stringify(data["errorMessage"]):"Niet door API verstuurd"}
                    </td></tr>
                    <tr><td>rowCount (aantal aangepast/getoond){": "}
                      {data["rowCount"] !== undefined? JSON.stringify(data["rowCount"]):"Niet door API verstuurd"}
                    </td></tr>
                  </>
                : <tr><td></td></tr>
                }
                   {data["rowCount"]<1?"Er zijn geen songs. Mogelijk onvoldoende rechten. Login met guest/10, of demo/demo":""}    
                  {data["resData"] !== undefined?            
                    <>
                      {
                      // *************************** DATA HERE ****************************
                      data["resData"].map((item,index) => 
                      <tr key={index}>
                        <td>{item['title']} {item['artist']} <span className="small"> {item['afspraken']} </span> <br/>
                          {( data["edit"] || data["demo"])?<SongDetailsModal callBack={callBack} song={item}/>:"" }{" "} 
                          {item['videoURL1']?
                          <a href={ item['videoURL1']} target="_blank" rel="noopener noreferrer" download>
                            <Button> <i className="fas fa-download"/>  Video </Button> {" "} 
                          </a>
                        :''
                        }

                        {item['videoURL2']?
                          <a href={ item['videoURL2']} target="_blank" rel="noopener noreferrer" download>
                            <Button> <i className="fas fa-download"/> Video(2) </Button> {" "} 
                          </a>
                        :''
                        }

                        {item['musicSheetURL1']?
                          <a href={ item['musicSheetURL1']} target="_blank" rel="noopener noreferrer" download>
                            <Button> <i className="fas fa-download"/> Chords </Button> {" "} 
                          </a>
                        :''
                        }

                        {item['musicSheetURL2']?
                          <a href={ item['musicSheetURL2']} target="_blank" rel="noopener noreferrer" download>
                            <Button><i className="fas fa-download"/> Chords(2) </Button> {" "} 
                          </a>
                        :''
                        }
                        {item['download1']?
                            <PDFViewerV1 fileName={item['download1']} visible={false}/>
                        :''
                        }
                        </td>     
                        </tr>
                      )}
                    </>
                    // data

                  : setshowAPIResNoData(true)
                }
              </>
            :<tr><td>no done found </td><td>{JSON.stringify(data)} {data['done']?"done":"false"}</td></tr>

          } 
        </tbody>
      </table>
    </>
    : "geen data beschikbaar!"
  )
}

export default PlayList;