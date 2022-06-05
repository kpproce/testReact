import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import SongDetailsModal from './SongDetailsModal';
import SongInsert from './SongINSERT';
import PDFViewerV1 from './PDFViewerV1';

// import UploadFile from './UploadFile';

//  ModSecurity stond niet aan bij hostingpartij bhosted: opgelost 

// $this->username = kimproce_root password = "B4EjH9ANDbKW"; */
// Source staat op: D:\xampp\htdocs\php_api_test\apiBasic


// const stored = localStorage.getItem('code');
  
const PlayList = (props) => {

  const [childChanged, setChildChanged] = useState(true)
  const [data, setData] = useState(null)
  const [showAPIResNoData, setshowAPIResNoData] = useState(false) // for debug and error handling
  const [filter, setFilter] = useState("") // 
  const [debug, setDebug] = useState(false) // 
  const [sortOnSongNameChecked, setSortOnSongNameChecked] = useState(false) // 
  
  
  const [groupName, setGroupName] = useState(props.groupName) 
  const [parentName, setParentName] = useState(props.parentName) 

  const [code, setCode] = useState(props.code); 
  const [username, setUsername] =  useState(props.username);
  const [newItemToegevoegd, setNewItemToegevoegd] = =  useState(false);

  // check local or provider 

  let fetchURL =""
  const hostName = window.location.host
  if (hostName.includes("localhost")) 
    fetchURL = "http://localhost/php_api_test/apiBasic/listSongsV4.php"
  else 
    fetchURL = "https://silvermusic.nl/test/apiBasic/listSongsV4.php"
  
  // alert(hostName)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({'username': username, 'code': code, 'filter':filter, 'parentName': parentName, 'folder':'songs' } )
  };

  const getData = () =>
  fetch(fetchURL, requestOptions)
    .then((res) => {
      if (!res.ok) { throw res }
      return res.json()
    })

  function sortData() {
    // sort by name
    if (data) {
      let valueA = ""
      let valueB = ""
      data.resData.sort(function(a, b) {
        if (!sortOnSongNameChecked) {
          valueA = a.title.toUpperCase(); // ignore upper and lowercase
          valueB = b.title.toUpperCase(); // ignore upper and lowercase
          console.log("Sort data --> checked")
        } else {
          valueA = a.groupName.toUpperCase(); // ignore upper and lowercase
          valueB = b.groupName.toUpperCase(); // ignore upper and lowercase
          console.log("Sort data --> UN-checked")
        }
        if (valueA < valueB) {
          return -1;
        }
        if (valueA > valueB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    }
  }

  useEffect(() => {
  
  },[sortOnSongNameChecked])

  function callBack() {    
    setChildChanged(true);
    // alert('callBack angeroepen');
    // getData();
  } 
   
  useEffect(() => {
    //alert(window.location.hostname)
    getData()
    .then((data) => {
      setData(data)
      console.log('resdata in use effect')
      console.log(data.resData)


      setChildChanged(false)
    }, [newItemToegevoegd])
    
  
    // .then(alert (data.resData[0].title))
  }, [childChanged])

  return (
    data? 
    <>
      <table border="1" className="messageContainer">
        <thead>
          <tr><th className = 'SLTH'></th></tr>
        </thead>
        <tbody>
          <tr><td colSpan="2">
        {/*     Filter aan/uit:{" "}
            <input
              name="isGoing"
              type="checkbox"
              checked={debug}
              onChange={e => {setDebug(e.target.checked) }}
            />
            {'  '} */}
            Sorteer:{" "}
            <input
              name="sortOnSongName"
              type="checkbox"
              checked={sortOnSongNameChecked}
              onChange={e => {
                setSortOnSongNameChecked(e.target.checked) 
                console.log('resdata in return voor sortdata')
                sortData() 
                console.log('resdata in return na sortdata')
               }}
            />

            {(data["edit"] || data["admin"])?
              <>            
               {' '}<SongInsert username={username} code={code} groupName={props.groupName} parentName={props.parentName} bron={username} showNewButton={true}  callBack={callBack} />
            </>
            :""
            }
          </td></tr>   
          {debug?
            <> 
              <tr><td  colSpan="2">
                {"Filter 1"}<input className= "small width30" name="name" value={filter} onChange={e => setFilter(e.target.value)}/>
                {" "}<button className= "small width30 " onClick ={ () => setChildChanged(true)}> refresh page</button>{" "} 
              </td></tr>
            </>
            :""
          }
          {
            data["done"] !== undefined? 
              <>
                  {data["rowCount"]<1?"Er zijn geen songs. Mogelijk onvoldoende rechten. Login met guest/10, of demo/demo":""}    
                  {data["resData"] !== undefined?            
                    <>
                      {
                      // *************************** DATA HERE ****************************
                 
                      data["resData"].map((item,index) =>             
                      <tr key={index}>
                        <td> 
                                                  
              
                          {item['title']} {item['artist']} <span className="small"> {item['afspraken']} </span> <br/>

                          <img src={process.env.PUBLIC_URL + '/' + item['groupName'] + '.jpg'} alt = {item['groupName']} width="35"/>{" "} 



                          {( data["edit"] || data["demo"])?<SongDetailsModal callBack={callBack} song={item} groupNameList={props.groupNameList}/>:"" }{" "} 
                          {item['videoURL1']?
                          <a href={ item['videoURL1']} target="_blank" rel="noopener noreferrer" download>
                            <Button> <i className="fas fa-download"/> <span className="xSmall"> Video </span>  </Button> {" "} 
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
                            <Button> <i className="fas fa-download"/> <span className="xSmall"> Chords </span> </Button> {" "} 
                          </a>
                        :''
                        }

                        {item['musicSheetURL2']?
                          <a href={ item['musicSheetURL2']} target="_blank" rel="noopener noreferrer" download>
                            <Button><i className="fas fa-download"/> <span className="xSmall"> Chords (2)</span>  </Button> {" "} 
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