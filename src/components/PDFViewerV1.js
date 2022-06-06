// https://github.com/wojtekmaj/react-pdf/tree/master/sample

import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import {FaDownload} from 'react-icons/fa';

export default class PDFViewerV1 extends Component {
  state = {
    fileName: this.props.fileName, 
    visible: this.props.visible,
    file1:  process.env.PUBLIC_URL + '/images/songs' + this.props.fileName,
    file: 'https://silvermusic.nl/test/apiBasic/images/songs/' + this.props.fileName,
    //showViewer: this.props.showViewer,
    //showDownload: this.props.showDownload,
    numPages: null,
  }

  handleClick() {
    this.setState({
      visible : !this.state.visible
    });
  }


  
  render() {
    const { file, numPages } = this.state;
    const fileLink="https://drive.google.com/file/d/1KtXzTp7NGWQWTTLbIxnpowzM8RRki1zT/view?usp=sharing" 
    return (
        <a href={file} target="_blank" rel="noopener noreferrer" download>
          <Button>
              <i className="fas fa-download"/>
              <FaDownload size="20"/>
          </Button>
        </a>
    );
  }
}

