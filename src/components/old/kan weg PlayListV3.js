import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import SongDetailsModal from './SongDetailsModal';
import PDFViewerV1 from './PDFViewerV1';

// problemen bij bhosted met ModSecurity

// "https://silvermusic.nl/test/apiBasic/read_playlist.php"
// "http://localhost/php_api_test/apiBasic/read_playlist.php"

// $this->username = kimproce_root password = "B4EjH9ANDbKW"; */
// Source staat op: D:\xampp\htdocs\php_api_test\apiBasic

const PlayList = () => {

  const [childChanged, setChildChanged] = useState(true)
  const [data, setData] = useState(null)
  const [showAPIResNoData, setshowAPIResNoData] = useState(false) // for debug and error handling
  const [filter, setFilter] = useState("") // 
  const [code, setCode] = useState("-") // 

  const fetchURL = "http://localhost/php_api_test/apiBasic/listSongsV2.php"
  // const fetchURL = "http://localhost/php_api_test/apiBasic/read_playlist.php"
  // const fetchURL = "https://silvermusic.nl/test/apiBasic/read_playlist.php"
  
  const changeCode = (c) => {
    setCode(c);
    setChildChanged(true);
  }

  const getData = () =>
    fetch(fetchURL, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body:  JSON.stringify({'code': code, 'filter':filter})
        // body:  'code=10&filter=2'
      })
      .then((res) => {
        if (!res.ok) { 
          throw res;  }
        return res.json()
      })
 
  function callBack() {    
    setChildChanged(true);
    // alert('test');
    // getData();
  } 
   
  useEffect(() => {
    getData()
    .then((data) => setData(data))
    .then (setChildChanged(false))
    //.then(alert ('child changed'))
  }, [childChanged])

  return (
    <table border="1" className="songlist">
      {//  id	  order1	  title	  artist	  afspraken	  videoURL1	  musicSheetURL1	  musicSheetURL2	  image1	  image2
      }
      {data?
        data["done"] !== undefined? 
          <>
            {showAPIResNoData? // toon response van de APi hier eventueel.
              <p>
                {// zou ook met een loop kunnen maar info is per item anders
                }
                <tr><td>accessCodeOkay (authorisatie?)</td><td>
                  {data["accessCodeOkay"] !== undefined? data["accessCodeOkay"]?"Okay":"Code niet okay":"Niet door API verstuurd"}
                </td></tr>
                <tr><td>done (verzoek door Server uitgevoerd?)</td><td>
                  {data["done"] !== undefined? data["done"]?"Ja":"Nee, is wat fout gegaan":"Niet door API verstuurd"}
                </td></tr>
                <tr><td>message (info van server)</td><td>
                  {data["message"] !== undefined? JSON.stringify(data["message"]):"Niet door API verstuurd"}
                </td></tr>
                <tr><td> errorMessage? (bij verwerken server)</td><td>
                  {data["errorMessage"] !== undefined? JSON.stringify(data["errorMessage"]):"Niet door API verstuurd"}
                </td></tr>
                <tr><td>rowCount (aantal songs aangepast)</td><td>
                  {data["rowCount"] !== undefined? JSON.stringify(data["rowCount"]):"Niet door API verstuurd"}
                </td></tr>
              </p>
            :""
            }
              {data["resData"] !== undefined?            
                <>
                  {
                  // *************************** DATA HERE ****************************
                  data["resData"]?.map((item,index) => 
                    <tr>
                    <td>{item['title']} {item['artist']} <span className="small"> {item['afspraken']} </span> <br/>
                    <SongDetailsModal callBack={getData} song={item}/>{" "} 
                      {item['videoURL1']?
                      <a href={ item['videoURL1']} target="_blank" rel="noopener noreferrer" download>
                          <Button>
                            <i className="fas fa-download"/>
                            Video
                          </Button> 
                          {" "} 
                      </a>
                    :''
                    }

                    {item['videoURL2']?
                      <a href={ item['videoURL2']} target="_blank" rel="noopener noreferrer" download>
                            <Button>
                                <i className="fas fa-download"/>
                                Video(2)
                            </Button>
                            {" "} 
                      </a>
                    :''
                    }

                    {item['musicSheetURL1']?
                      <a href={ item['musicSheetURL1']} target="_blank" rel="noopener noreferrer" download>
                            <Button>
                                <i className="fas fa-download"/>
                                Chords
                            </Button>
                            {" "} 
                      </a>
                    :''
                    }

                    {item['musicSheetURL2']?
                      <a href={ item['musicSheetURL2']} target="_blank" rel="noopener noreferrer" download>
                            <Button>
                                <i className="fas fa-download"/>
                                Chords(2)
                            </Button>
                            {" "} 
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
        :<p>no done found <br/> {JSON.stringify(data)} {data['done']?"done":"false"}</p>
      :<p>no data found </p>
      }

      <thead>
        <tr>
          <th className = 'SLTH'> 
            <tr>{"Accesscode:"} <input className= "small width10" name="name" value={code} onChange={e => changeCode(e.target.value)}/>
            {"Filter"} <input className= "small width30" name="name" value={filter} onChange={e => setFilter(e.target.value)}/>
            </tr><tr>
            Song <button className= "small width30 " onClick ={ () => setChildChanged(true)}> refresh page</button>  {" "} 
            {" "} <button className= "small width30 " onClick ={ () => setshowAPIResNoData(!showAPIResNoData)}>{showAPIResNoData? 'hide APIinfo':'show APIinfo'}</button>
            </tr>
          </th>              
        </tr> 
      </thead>
      <tbody>
      </tbody>
    </table>
  )
}

export default PlayList;