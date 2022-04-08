import React, {useState, useEffect} from 'react';

// const FileNameSelect = () => {

const FileNameSelect = ({callbackFileChanged, selectedStart}) => {

  const [data, setData] = useState(null)
  const [filter, setFilter] = useState("") // 
  const [code, setCode] = useState("63") // 
  const [selected, setSelected] = useState("")


  let fetchURL=""
  const hostName = window.location.host
  if (hostName.includes("localhost")) 
    fetchURL = "http://localhost/php_api_test/apiBasic/listFileNamesV2.php"
  else 
    fetchURL = "https://silvermusic.nl/test/apiBasic/listFileNamesV2.php";
  
  const changeCode = (c) => {
    setCode(c);
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    , body: JSON.stringify({'code': code, 'filter':filter})
  };

  async function getData() {
    const res = await fetch(fetchURL, requestOptions);
    if (!res.ok) {
      throw res;
    }
    return res.json();
  }
    
  useEffect(() => {
    getData()
    .then((data) => setData(data['resData']))
  }, [])

  const handleSelect = (selectedFileName) => {
    setSelected(selectedFileName)
    callbackFileChanged(selectedFileName)
    // alert(e.value)
  }

  return (
   <>
    {data?
       <select name="files" value={selected} value={selectedStart} onChange={e => {handleSelect(e.target.value)}} >
        {data.map((item, key) => {
          return <option key={key} value={item.fileName}>{item.fileName}</option>;
        })}
      </select>          
      :"empty, could not list filenames"

    }
  </>
  )
 }

export default  FileNameSelect;
