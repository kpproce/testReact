import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ShowResponse from './ShowResponse'

function UploadFile(props) {
  const { register, handleSubmit } = useForm()
 
  const [resData, setResData] = useState(null)
  const [filename, setFilename] = useState("geen file")
  const [uploadTekst, setUploadTekst] = useState('UPLOAD --> Silvermusic')

  useEffect(() => { 

  },  [filename]) 

  const onSubmit = async (data) => {
    console.log('data --- data --- ')
    console.log(data)
    const formData = new FormData()
      formData.append("file",data.picture[0])
      formData.append("imagePath"  , 'images') 
      formData.append("parentName" , props.parentName)
      formData.append("groupName"  , props.groupName)
      let url=""
      const hostName = window.location.host
      if (hostName.includes("localhost")) 
        url = "http://localhost/php_api_test/apiBasic/AddFileToMap.php"
      else 
        url = "https://silvermusic.nl/test/apiBasic/AddFileToMap.php";

        // alert("UploadFile --> onSubmit called");

      const res1 = await fetch(url, {
        method: "POST",
        body: formData
        }).then(
            res => res.json(res)

            // voorbeeld: hello = val => "Hello " + val;
        .then(function(res) {
            setResData(res);
            setFilename(res.filename);
            props.callbackUploadModalFileChanged(res.filename);
        }))
  }

  const handleChangeInput = (e) => {
    e.persist() // kan waarsch weg obsolate
    setFilename(e.target.value)
  }

  return (
    <>
    <p>Hiermee kun je een image of pdf van de songs uploaden. </p>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <input ref = {register} type="file" name="picture" onChange={handleChangeInput}/> 
        {!(filename==="geen file")? <>  <button type="submit">{uploadTekst}</button> </>
          : <></>
        }
        {props.parentName}{'/'}{props.groupName} 
    </form>
    
    {resData?<ShowResponse JsonData = {resData} /> : ""}
    </>

  )
}
export default UploadFile;

