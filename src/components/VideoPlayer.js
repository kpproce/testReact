import React from 'react';
import SongList from '../data/songs2.json';
import './songList.css';

import ReactPlayer from 'react-player'

class VideoPlayer extends React.Component {

// *****************************************
   render () {
    return (
       <>
       <h2>Eerste oefensessie</h2>
       <ReactPlayer width="95%" controls= "true" url='https://youtu.be/2e5feNT_7yE' />
       <h2>Voorbeeld van onze zusterclub uit Arnhem</h2>
       <ReactPlayer width="95%" controls= "true" url='https://youtu.be/DBOx_61h_NE' />
       </>

    )
  }
}

export default VideoPlayer