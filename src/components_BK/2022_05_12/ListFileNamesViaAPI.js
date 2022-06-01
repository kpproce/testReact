import React, {useState, useEffect} from 'react';

// const FileNameSelect = () => {

// onst FileNameSelect = ({callbackFileChanged, selectedStart, sourceChangedParam}) => {

const ListFileNamesViaAPI = (props) => {

  const [data, setData] = useState(null)
  const [filter, setFilter] = useState("") // 
  const [code, setCode] = useState("63") // 
  const [sourceChanged, setsourceChanged] = useState(props.sourceChangedParam) // 
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
  }, [sourceChanged])

  useEffect(() => {
    // declare the async data fetching function
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
  
  }, [])

  const handleSelect = (selectedFileName) => {
    setSelected(selectedFileName)
    //alert(selectedFileName)
    props.callBackSFN(selectedFileName)
    // alert(selectedFileName)
  }

 
  return (
   <>
    {data?
       <select className="width70" name="files" value={props.selectedStart} onChange={e => {handleSelect(e.target.value)}} >
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

export default  ListFileNamesViaAPI;
