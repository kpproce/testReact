import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ShowResponse from './ShowResponse'

function App() {
  const { register, handleSubmit } = useForm()
 
  const [resData, setResData] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData()
      formData.append("file",data.picture[0])

      let url=""
      const hostName = window.location.host
      if (hostName.includes("localhost")) 
        url = "http://localhost/php_api_test/apiBasic/AddFileToMap.php"
      else 
        url = "https://silvermusic.nl/test/apiBasic/AddFileToMap.php";

      const res = await fetch(url, {
        method: "POST",
        body: formData
        }).then(
            res => res.json(res)
        .then(function(res) {
          setResData(res);
        }))
  }

  return (
    <>
    <p>Hiermee kun je een pdf van de songs uploaden. Zelf uploaden van Images (fotos) wordt nog aan gewerkt. </p>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <input ref = {register} type="file" name="picture" />
      <button type="submit">upload1</button>
    </form>
    {resData?<ShowResponse JsonData = {resData} /> : ""}
    </>

  )
}
export default App;

