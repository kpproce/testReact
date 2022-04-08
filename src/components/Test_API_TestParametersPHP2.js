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

const Test_API_TestParametersPHP = () => {

  const [childChanged, setChildChanged] = useState(true)
  const [data, setData] = useState(null)
  const [showAPIResNoData, setshowAPIResNoData] = useState(false) // for debug and error handling
  const [filter, setFilter] = useState("sul") // 
  const [code, setCode] = useState("11") // 

  // const fetchURL = "http://localhost/php_api_test/apiBasic/listSongsV3.php"
  // const fetchURL = "http://localhost/php_api_test/apiBasic/read_playlist.php"
  // const fetchURL = "https://silvermusic.nl/test/apiBasic/read_playlist.php"
  // const fetchURL = "http://localhost/php_api_test/apiBasic/testParameters.php"
  const fetchURL = "https://silvermusic.nl/test/apiBasic/testParameters.php"
  
  const changeCode = (c) => {
    setCode(c);
    setChildChanged(true);
  }


  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: '12' })
  };

  const getData = () =>
    fetch(fetchURL,requestOptions)

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
    <>
    data2:
    { data?JSON.stringify(data):".no data.."}
   </>
  )
}

export default Test_API_TestParametersPHP;