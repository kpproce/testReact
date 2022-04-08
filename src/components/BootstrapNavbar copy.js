import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import { Navbar,Nav} from 'react-bootstrap'
  import SongList3TableFilter from './SongList3TableFilter';
  //import Home from './Home';

  import VideoPlayer from './VideoPlayer';
  import './basis.css';
  
class BootstrapNavbar extends React.Component{
    handleRerender = () => {
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="md" sticky="top">
                                <span className="menuWebsiteName"> Silvermusic Huissen </span>
                                <Navbar.Brand href="#home"></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                         <Nav.Link href='/lijst' >Speellijst</Nav.Link>
                                        <Nav.Link href='/player'>Video test</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <Switch>

                                <Route path="/lijst">   <SongList3TableFilter/> </Route>
                                <Route path="/player">  <VideoPlayer/>  </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;