import React from 'react';

import listReactFiles from 'list-react-files'


import './songList.css';

class fotoBasic extends React.Component {

  filenamePart = (p1) => {
    return p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
  
  fileInclPath = (p1) => {
    return "../images/" + p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
// *****************************************

render () {  
  var t;
  t = process.env.PUBLIC_URL + '/images/*'
  return (
   
    <h3> {t} </h3>

    )
  }
}

export default fotoBasic 



