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

const PlayListV2 = () => {

  const [childChanged, setChildChanged] = useState(true)
  const [data, setData] = useState(null)

  // const fetchURL = "http://localhost/php_api_test/apiBasic/listSongsV2.php"
  const fetchURL = "http://localhost/php_api_test/apiBasic/read_playlist.php"
  // const fetchURL = "https://silvermusic.nl/test/apiBasic/read_playlist.php"
  
  const getData = () =>
    fetch(`${fetchURL}/posts`)
      .then((res) => {
        if (!res.ok) { 
          throw res;  }
        return res.json()
      }
      
      )
 
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
        
        <p>{JSON.stringify(data)}</p>:<p>....</p>
      }

      <thead>
        <tr>
          <th className = 'SLTH'> Song   <button onClick ={ () => setChildChanged(true)}> refresh page</button></th> 
        </tr> 
      </thead>
      <tbody>
       
      {data?.map((item,index) => 
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
      </tbody>
    </table>
  )
}

export default PlayListV2;