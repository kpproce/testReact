import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route, Link
  } from "react-router-dom";
  import { Navbar,Nav} from 'react-bootstrap'
  import SongList3TableFilter from './SongList3TableFilter';
  import Messages from './MessagesTest';
  import Home from './HomeTMP';
  import fotosBasic from './fotosBasic';
  import VideoPlayer from './VideoPlayer';
  import './basis.css';
  
  //const Home = () => <div><h2>Home page</h2></div>

class BootstrapNavbar extends React.Component{
    handleRerender = () => {
    }

    render(){
        
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router basename='/'>
                            <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
                                <span className="menuWebsiteName"> Silvermusic Huissen </span>
                                <Navbar.Brand href="#home"></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto"> 
                                        <Link className="nav-link" to='/Home' >Home</Link>
                                        <Link className="nav-link" to='/lijst' >Playlist</Link>
                                        {/* <Link className="nav-link" to='/messages'>messages</Link> */}
                                        <Link className="nav-link" to='/fotosBasic'>fotos</Link>
                                        <Link className="nav-link" to='/player'>Video vb</Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/" component={Home} />          
                                <Route path="/lijst" component={SongList3TableFilter} />                                
                                <Route path="/messages" component={Messages} />       
                                <Route path="/fotosBasic" component={fotosBasic} />       
                                <Route path="/home" component={Home} />     
                                <Route path="/player" component={VideoPlayer} />       
                                {/* <Route path="/lijst">   <SongList3TableFilter/> </Route>
                                <Route path="/player">  <VideoPlayer/>  </Route> */}
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;