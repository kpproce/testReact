import React from 'react';
import ModalImage from "react-modal-image";

class SongDetails3 extends React.Component {
  render () {
    const  song = this.props.song
    const index = this.props.index
    return (
      <tr> 
        <td> 
          <tr>{song.title}</tr> 
          <tr> {song.artist} </tr> 
        </td>  
        <td className = "linkColumn">
          <tr> <a href ={song.video} target="_blank" >video</a> </tr>
          {song.music?
            <tr> <a href ={song.music} target="_blank" >akkoorden</a></tr>
            : "" 
          } 
          {song.image1?
            <tr>
              <ModalImage
                small={'/testreact/images/2020-09-06 drumstel in de nieuwe kast van Hans.jfif'}
                large= {process.env.PUBLIC_URL + '/images/'+song.image1 }
                smallSrcSet= "300w"
                alt={ "akkoorden " + song.image1} 
              />
            </tr>
          : ""}
        </td>
        <td> {song.afspraken} </td> 
      </tr>) 
  } 
}
export default SongDetails3