// https://github.com/wojtekmaj/react-pdf/tree/master/sample

import React, {useState, useEffect} from 'react';
import { Button} from 'react-bootstrap';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import {FaDownload} from 'react-icons/fa';

const PDFViewerV2 = (props) => {

  function handleClick() {
    setVisible(!visible)
  };

  const [fileName, setfileName] = useState(props.fileName)
  const [folder, setfolder] = useState(props.folder) // default folder 
  const [visible, setVisible] = useState(props.visible)
  const [defUrl, setdefUrl] = useState(() => {
    if (window.location.host.includes("localhost")) 
      return "http://localhost/php_api_test/apiBasic/images/" + folder + "/" + fileName
    else 
      return "https://silvermusic.nl/test/apiBasic/images/" + folder + "/" + fileName
    }
  )


  useEffect(() => {
  
  })

  

  return (
      <a href={file} target="_blank" rel="noopener noreferrer" download>
          <Button>
              <i className="fas fa-download"/>
              <FaDownload size="20"/>
          </Button>
        </a>
  )
}

export default PDFViewerV2;
