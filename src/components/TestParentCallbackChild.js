import React, { useState } from 'react';


const ChildComponent = ({callback, count }) => {
  return (
    <button onClick={callback}>
       Click me {count}
    </button>
  )
}
export default ChildComponent;