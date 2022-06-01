import React, {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import NewsItem from './NewsItemV1';
import NewsItemInsert from './NewsItemINSERT'
import NewsItemsDelete from './NewsItemsDelete';
import UploadFile from './UploadFile';
// import ListFileNamesViaAPI from './ListFileNamesViaAPI';

//  ModSecurity stond niet aan bij hostingpartij bhosted: opgelost 

const NewsItems = (props) => {

  // props pageFilter = home or messages

  const [childChanged, setChildChanged] = useState(false)
  const [fetchedData, setData] = useState(null)
  const [queryResSucces, setQueryResSucces] = useState(false)
  const [showAPIResNoData, setshowAPIResNoData] = useState(false) // for debug and error handling
  const [pageFilter, setPageFilter] = useState(props.pageFilter) // 
  // const [code, setCode] = useState("10") // code voor api, die geeft geen data bij foute code.
  const [debug, setDebug] = useState(false) // 

  const [imageList, setImageList] = []

  const [code, setCode] = useState(() => {
    try {
      const item = window.localStorage.getItem('code');
      return item ? JSON.parse(item) : '10';
    } catch (error) {
      console.log(error);
      return '10';
    }
  });

  const basisURL = useState(() => {
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/"
    else 
      return "https://silvermusic.nl/test/apiBasic/"
  });

  const basisImageURL = useState(() => {
    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/" + props.parentName + '/' + props.groupName + '/'
    else 
      return "https://silvermusic.nl/test/apiBasic/" + props.parentName + '/' + props.groupName + '/'
  });

  const username = useState(() => {
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

  let fetchURL = ""
  fetchURL = basisURL + "listMessagesV2.php"

  // alert(basisURL +  ' ' + fetchURL )

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({'username': username, 'code': code, 'pageFilter':pageFilter, 'groupName': props.groupName, 'groupNameList': props.groupNameList})
  };

  const getData = () =>
  // fetch(fetchURL, requestOptions)
    fetch(fetchURL, requestOptions)
      .then((res) => {
        if (!res.ok) { throw res }
        return res.json()
      })

  let fetchImageListURL = basisURL + "listFileNamesV2.php"
 
  const requestImageListOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    , body: JSON.stringify({'code': code, 'groupName': props.groupName, 'parentName': props.parentName, 'filter':""})
  };

  const  getImageList = () => 
  // fetch(fetchURL, requestOptions)
    fetch(fetchImageListURL, requestImageListOptions)
      .then((res) => {
        if (!res.ok) { throw res }
        return res.json()
      })

  const callBack = () => {
    setChildChanged(true);
    // alert('NewsItemsV1 callBack aangeroepen');
  } 

  useEffect(() => {
    // alert (username)
    getData()
    .then((fetchedData) => setData(fetchedData))
    .then (setChildChanged(false))
    // .then(alert ('data received'))

    getImageList()
    .then((fetchedImageList) => setImageList(fetchedImageList))
  // .then(alert ('data received'))

  }, [childChanged])

  return (
    fetchedData? 
      fetchedData["queryResSucces"]?<>
       {" "} {props.groupName} {" "} <NewsItemInsert username={username} code={code} groupName={props.groupName} parentName={props.parentName} bron={username} showNewButton={fetchedData["role"].includes("edit") || fetchedData["role"].includes("demo") || fetchedData["role"].includes("admin") } callBack={callBack} />

        {fetchedData["resData"].map((item,index) => {
            return (
              <NewsItem key={index} item={item} username={username} code={code} pageFilter={pageFilter} role={fetchedData["role"]} callBack={callBack} basisURL={basisURL} basisImageURL={basisImageURL}  groupName={props.groupName} groupNameList={props.groupNameList} parentName={props.parentName}/>        
            )
          })
        }
      </> : 
      " Geen data: " + fetchedData["errorMessage"]
    : " Geen data beschikbaar!"
  )
}

export default NewsItems;