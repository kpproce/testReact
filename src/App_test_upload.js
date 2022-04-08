import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ShowResponse from './components/ShowResponse'

function UploadFile() {
  const { register, handleSubmit } = useForm()
 
  const [resData, setResData] = useState(null)

  const onSubmit = async (data) => {
    const formData = new FormData()
      formData.append("file",data.picture[0])
      const url ='http://localhost/php_api_test/apiBasic/AddFileToMap.php'
      const res = await fetch(url, {
        method: "POST",
        body: formData
        }).then(
            res => res.json(res)
           
        .then(function(res) {
          setResData(res);
          console.log('***********');
          console.log('***** RES ******');
          console.log(res);
          console.log('***** EINDE RES ******');
          console.log('***********');
          console.log('***** data ******');
          console.log(data);
          console.log('***** data ******');  
          console.log('***********'); 
          console.log('***** formData ******');
          console.log(formData);
          console.log('***** EINDE formData ******');  
        }))
  }

  return (
    <>
    <form onSubmit = {handleSubmit(onSubmit)}>
      <input ref = {register} type="file" name="picture" />
      <button type="submit">submit</button>
    </form>
    {resData?<ShowResponse JsonData = {resData}/> : ""}
    </>

  )
}
export default App;

