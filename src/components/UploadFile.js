import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ShowResponse from './ShowResponse'

function UploadFile(props) {
  const { register, handleSubmit } = useForm()
 
  const [resData, setResData] = useState(null)
  const [groupOrParent, setGroupOrParent] = useState("group")
  const [filename, setFilename] = useState("geen file")
  const [uploadButtonStyle, setUploadButtonStyle] = useState("visible")
  // const [uploadTekst, setUploadTekst] = useState('UPLOAD --> '+ props.groupName)
  const [uploadTekst, setUploadTekst] = useState('UPLOAD --> ')


  // props in 
  // -- parenName
  // -- groupName  --> if empty then no select group or parent
 

  useEffect(() => { 

  },  [filename]) 

  const onSubmit = async (data) => {
    console.log('data --- data --- ')
    console.log(data)
    const formData = new FormData()
      formData.append("file",data.picture[0])
      formData.append("imagePath"     , 'images') 
      formData.append("parentName"    , props.parentName)
      formData.append("groupName"     , props.groupName)
      formData.append("groupOrParent" , groupOrParent)
      
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
    setUploadButtonStyle("none")
  }

  return (
    <>
    <p>upload een image of een pdf. </p>
    <form onSubmit = {handleSubmit(onSubmit)}> 
      <input ref = {register} type="file" style={{display:{uploadButtonStyle}}}  className="unAvailable" name="picture" onChange={handleChangeInput}/> 
        {!(filename==="geen file")? 
        <> 
          <br></br> 
          <br></br> 
          {props.groupName === ""? // no groupName no select for group --> file (pdf wiill be placed in parent (songs?) map)
            "" 
          :
          <div onChange={((event) => {setGroupOrParent(event.target.value)})}>
           
            Afbeelding tonen en kiezen voor:<br></br> 
            <input type="radio" value= "group" name="groupParent" checked={groupOrParent === 'group'}/> 
              Alleen: {props.groupName} <br></br>
            <input type="radio" value="parent" name="groupParent"  checked={groupOrParent === 'parent'}/> 
              Alle groepen in: {props.parentName}
          </div>
           
          }
        
            {/* <select className="width60 marginBottom10" value = {groupOrParent} onChange= {((event) => {setGroupOrParent(event.target.value)})}>
              <option value="parent">image ook voor {props.parentName}</option>
              <option value="group">image alleen voor {props.groupName}</option>
            </select> */}
          {groupOrParent}
          <br></br>
          <button type="submit" >{uploadTekst}</button> 
        </>
          : <></>
        }
        {/* 
          props.parentName}{'/'}{props.groupName} 
        */}
    </form>
    
    {resData?<ShowResponse JsonData = {resData} /> : ""}
    </>

  )
}
export default UploadFile;

