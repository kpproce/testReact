import React, { useState, useEffect } from 'react';
import ShowResponse from  './ShowResponse'; 
import { useForm } from 'react-hook-form'

const TestUpload = () => {
  const [data1, setData] = useState(null)
  const [res1, setRes1] = useState(null)

  const { register, handleSubmit } = useForm()
  const [resData, setResData] = useState(null)
  
  // const fetchURL = "http://localhost/php_api_test/apiBasic/read_playlist.php"
   const fetchURL = "http://localhost/php_api_test/apiBasic/AddFileToMap.php"
   // const fetchURL = "http://localhost/php_api_test/apiBasic/updateSongV2.php"
  
  const [dataGevondenArray, setDataGevondenArray]  = useState([])

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify({'code': "11", 'filter':""})
  };

  const getData = () =>
    fetch(fetchURL, requestOptions)
    // fetch(`${fetchURL}/posts`)
    .then((res) => res.json())
   
    // .then((res) => {
    //   if (!res.ok) { 
    //     throw res;  }
    //   return res.json()
    // })

  useEffect(() => {
    getData().then((data1) => setData(data1))
    getData().then((res1) =>  setRes1(res1))
    alert("useEffect aangeroepen")
  }, [])

  if (!data1) {
    dataGevondenArray.concat('GEEN DATA ')
    console.log(" ********* Geen data ")

    return <span> ********* Geen data </span>
  } else { 
    dataGevondenArray.concat('WEL DATA ')
    console.log(" *-------* wel data: RES ")
    console.log(res1)
    console.log(" ------------------------")
    console.log(" *-------* wel data: Data ")
    console.log(data1)
    return <ShowResponse JsonData = {data1}/> 
    // return <span>{setDataGevondenArray}</span>

  }


}

export default TestUpload;
 
 

  