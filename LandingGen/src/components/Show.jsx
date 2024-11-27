
import React ,{useState} from 'react'

export default function Show() {
  const [click,setClick]=useState(false);
  const handleShow=()=>{
    if(click===false){
      setClick(true);
    }
    else{
      setClick(false);
    }
    

  }
  return (
    <div className="App">
      <button onClick={handleShow}>Show/Hide</button>
      {click && <h1>Hello from another World</h1>}

  
    </div>
  );
}
