import React from 'react';

class SongDetails3 extends React.Component {
    render () {
      const  song = this.props.song
      const index = this.props.index
      return ( <tr> <td> {index+1}</td>
                    <td>{song.artist}</td>
                    <td> {song.title}</td>
                    <td> <a href ={song.link} target="_blank" >Play</a></td>
              </tr> ) 
  }
}
export default SongDetails3 