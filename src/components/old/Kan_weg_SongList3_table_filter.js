import React from 'react';
import SongDetails3_table from './SongDetails3_table';
import SongList from '../data/songs2.json';

import './songList.css';

class SongList3_table_filter extends React.Component {

// *****************************************

// deze versie leest de data uit bestand songs.json en filtert deze via state.filter

// *****************************************

  constructor(props) {
    super(props);
    this.state = {
     filter: ''
    } 
  }


handleChange(event) {
  // hiermee zorg je er voor dat this.state.value actueel blijft en die zie je in de input
  this.setState({filter: event.target.value});
}
   render () {
    return ( 
    	 <div> 
        <h3>Songs</h3>  
        <input type="text" value={this.state.filter} onChange={(e) => this.handleChange(e)}/>
        <table className="songlist">
        <tr> <th> nr </th> <th> artiest </th> <th> song </th> <th> link</th> </tr>  
         
          {
          SongList.SongList1.filter(item => item.artist.includes(this.state.filter)).map((item, index)=> {
              // map() heeft 2 standaard parameters, de eerste is 
              // een item uit de lijst en de tweede de index van 
              // dat item 
              // geef de song door aan de child
            return <SongDetails3_table song = {item} index = {index}/>
          })
        }
        </table>
      </div>
    )
  }
}

export default SongList3_table_filter