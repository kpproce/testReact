import React from 'react';
import SongDetails3Table from './SongDetails3Table';
import SongList from '../data/songs2.json';

import './songList.css';

class SongList3TableFilter extends React.Component {

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
        <h4>Playlist Silvermusic (klik op de linkjes)</h4>  
{/*         <input type="text" value={this.state.filter} onChange={(e) => this.handleChange(e)}/> */}
        <table className="songlist">
           <tr> <th className="SLTH">Song / artist </th> 
                <th className="SLTH">afspraken</th> <th className="SLTH"> Linkjes </th> 
          </tr>  
         
          {
          SongList.SongList1.filter(item => item.artist.includes(this.state.filter)).map((item, index)=> {
           // filter wordt niet gebruikt in deze pagina
            return <SongDetails3Table song = {item} index = {index}/>
          })
          
        }
        </table>
        
        <br/>

        <table className="songlist">
           <tr> <th className="SLTH">Voorgestelde songs / artist </th> 
                <th className="SLTH">afspraken</th> <th className="SLTH"> Linkjes </th> 
          </tr>  
         
          {
          SongList.SongList2.filter(item => item.artist.includes(this.state.filter)).map((item, index)=> {
           // filter wordt niet gebruikt in deze pagina
            return <SongDetails3Table song = {item} index = {index}/>
          })
          
        }
        </table>


      </div>
    )
  }
}

export default SongList3TableFilter