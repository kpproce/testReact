import React, { useState, useEffect } from 'react';
import ShowResponse from  './ShowResponse'; 
import { useForm } from 'react-hook-form'

const TestUpload = () => {
  const { register, handleSubmit } = useForm() 
  
  const onSubmit = (data) => {
   
   
      console.log(data)
  }
  
  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <input ref={register} requered name = "image" type="file" onChange= {onchange} />
      <button>Submit1</button>
    </form>
  );
}

export default TestUpload;
 
 

  