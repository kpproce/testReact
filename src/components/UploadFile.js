import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ShowResponse from './ShowResponse'

function App(props) {
  const { register, handleSubmit } = useForm()
 
  const [resData, setResData] = useState(null)
  const [filename, setfilename] = useState("geen file")


  const onSubmit = async (data) => {
    const formData = new FormData()
      formData.append("file",data.picture[0])
      
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
            setfilename(res.filename);
            props.callbackFileChanged(res.filename);
           /*  props.handleFileNameChanged("accu.jfif");
            props.callbackFileChanged("accu.jfif");
            alert("UploadFile --> onSubmit called"); */
        }))
  }

  return (
    <>
    <p>Hiermee kun je een image of pdf van de songs uploaden. </p>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <input ref = {register} type="file" name="picture" /> 
      <button type="submit">upload1</button>

    </form>
    {resData?<ShowResponse JsonData = {resData} /> : ""}
    </>

  )
}
export default App;

