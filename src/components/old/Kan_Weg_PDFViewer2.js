// https://github.com/wojtekmaj/react-pdf/tree/master/sample
//https://spectrum.chat/react-pdf/general/how-to-get-the-download-link-using-pdfdownloadlink~3e2ae813-5f49-42c1-9753-436ee62bd5fd
import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import PDFViewer from 'pdf-viewer-reactjs'

// voor de download
import {Document, Page,Text, StyleSheet, View} from '@react-pdf/renderer';
import {PDFDownloadLink} from '@react-pdf/renderer';
import Tmp from './tmp';

export default class PDFViewerV1 extends Component {
  state = {
    fileName: this.props.fileName, 
    visible: this.props.visible,
    file:   '../../public/images/' + this.props.fileName,
    numPages: null,
  }

  handleClick() {
    this.setState({
      visible : !this.state.visible
    });
  }

  

  render() {
    const { file, numPages } = this.state;

    const GeneratePdf = () => (
      <div>
      <PDFDownloadLink document={<Tmp />} fileName={file}>
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
      </div>
    )


    return (
      <div className="Example">
        <header>
        </header>
        <div className="Example__container">      
          <div className="Example__container__document">
            <button onClick={() => this.handleClick()}>
                {this.state.visible ? 'Sluiten' : this.state.fileName  }
            </button>
            {this.state.visible? 
              <GeneratePdf/>

             :""}
          </div>
        </div>
      </div>
    );
  }
}

