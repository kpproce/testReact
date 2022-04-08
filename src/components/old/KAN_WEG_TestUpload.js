import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
// import './App.css';

function TestUpload() {
    const { register, handleSubmit } = useForm()
    const [ filename, setFilename ] = useState("test")
    const [ uploadError, setUploadError] = useState()
    
  function test() {
    // setFilename("test na submit")
    console.log("filename ********* \n")
    console.log(filename)
    alert ("TEST " )
  }

  const testOnSubmit = (anyFunction) => {
    handleSubmit(onSubmit)
  }

  const onSubmit = (data) => 
  {
    console.log(data)
  }

/*   const onSubmit = async (data) => {
    const formData = new FormData()
    console.log("***********  TEST ")
    formData.append("file", data.file[0])
    setFilename("Test onsubmit")
    const url = "http://localhost/php_api_test/apiBasic/AddFileToMap"
    const res = await fetch(url, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(setUploadError(JSON.stringify(res)))
  }
   */

  
  function handleChange(event) {
    setFilename(`${event.target.files[0].name}`)
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} onChange={handleChange} type="file" name="file" />
      <button>Submit</button>
      <div>-{filename}-</div>
    </form>
    {uploadError}
    </>
  );
}

export default TestUpload;