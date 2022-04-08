import React, { useState } from 'react';
import ChildComponent from './TestParentCallbackChild';


const TestParentCallback = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 2)
  }

  return (
    <div className="App">
      <ChildComponent callback={increment} count={count} />         
      <h2>count {count}</h2>
      (count should be updated from child)
    </div>
  );
} 
export default TestParentCallback; 