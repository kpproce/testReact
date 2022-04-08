// https://github.com/wojtekmaj/react-pdf/tree/master/sample

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


export default class PDFViewer extends Component {
  state = {
    fileName: this.props.fileName, 
    visible: this.props.visible,
    file:  process.env.PUBLIC_URL + '/images/' + this.props.fileName,
    numPages: null,
  }

  handleClick() {
    this.setState({
      visible : !this.state.visible
    });
    
  }

   render() {
    const { file, numPages } = this.state;

    return (
      <div className="Example">
        <header>
        </header>
        <div className="Example__container">      
          <div className="Example__container__document">
            <button onClick={() => this.handleClick()}>
                {this.state.visible ? 'sluit' : this.state.fileName  }
            </button>
            {this.state.visible? 
              <Document
                file={file}
                onLoadSuccess={this.onDocumentLoadSuccess}
              >   
                {
                  Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <Page
                        key={`page_${index + 1}`}  
                        pageNumber={index + 1}
                      />
                    ),
                  )
                }
              </Document>
             :""}
          </div>
        </div>
      </div>
    );
  }
}

