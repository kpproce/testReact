import React, {useState, useEffect} from 'react';

// const FileNameSelect = () => {

const ListSelectFileNames = ({code, callbackFileChanged, selectedStart}) => {

  const [data, setData] = useState(null)
  const [filter, setFilter] = useState("") // 
  const [selectedFile, setSelectedFile] = useState("")


  useEffect(() => {
    // declare the async data fetching function

    let fetchURL=""

    const hostName = window.location.host
    if (hostName.includes("localhost")) 
      fetchURL = "http://localhost/php_api_test/apiBasic/listFileNamesV2.php"
    else 
      fetchURL = "https://silvermusic.nl/test/apiBasic/listFileNamesV2.php";

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({'code': code, 'filter':filter})
    };

    const fetchData = async () => {
      // get the data from the api
      const res = await fetch(fetchURL, requestOptions);
      return res.json();
    }
  
    // call the function
    const result = fetchData()
      .then((data) => setData(data['resData']))
      // make sure to catch any error
       
      .catch(console.error);;
  
  }, [selectedFile])

  const handleSelect = (fileName) => {
    setSelectedFile(fileName)
    callbackFileChanged(fileName)
    // alert(selectedFileName)
  }

  return (
   <>
   test12
    {data?
       <select name="files" value={selectedStart} onClick={e => {handleSelect(e.target.value)}} >
        {data.map((item, key) => {
          return <option key={key} value={item.fileName}>{item.fileName}</option>;
        })}
      </select>          
      :"empty, could not list filenames"
     
    }
    {/* {data?alert("!! ** ListFileNames gererenderd " + JSON.stringify(data)): ""} */}
  </>
  )
 }

export default  ListSelectFileNames;
