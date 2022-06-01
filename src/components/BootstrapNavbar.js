import React from 'react'
import {
    HashRouter as Router,
    Switch,
    Route, Link
  } from "react-router-dom";
  import { Navbar,Nav,NavDropdown} from 'react-bootstrap'
  import SongList3TableFilter from './SongList3TableFilter';
  import PlayList from './PlayListV4';
  import Test_API_TestParametersPHP from './Test_API_TestParametersPHP2';
  import Messages from './MessagesTest';
  import Home from './Home';
  import Test from './test';
  import NewsItems from './NewsItemsV1';

  import FotoGallery from './FotoGallery';
  import VideoPlayer from './VideoPlayer';
  import LoginModal from './LoginModal';
  import UploadModal from './UploadModal';
//   import ListFileNamesViaAPI from './ListFileNamesViaAPI';
  import Test_API_checkAccessCode from './Test_API_checkAccessCode';

  import  About from './About';
 
  import {FaHome} from 'react-icons/fa';
  import './basis.css';
  
  //const Home = () => <div><h2>Home page</h2></div>

class BootstrapNavbar extends React.Component{
    
    groupNameList = ['Huusband1', 'Huusband2', 'WasbordBand']

    getGroupName = () => {
        let group = window.localStorage.getItem('groupName')
        return group ? JSON.parse(group) : 'noGroup'
    }
    
    groupName = this.getGroupName();

    handleRerender = () => {
    }
    
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router basename='/'>
                            <Navbar bg="dark" variant="dark" /*expand="lg"*/ sticky="top">
                                <span className="menuWebsiteName small"> </span>      
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto"> 
                                        <Link className="nav-link" to='/home'><FaHome size={30} style={{ color: 'white' }} /> <span className="xSmall">Home</span> {" "} </Link>
                                        <Link className="nav-link" to='/playList'>Songs</Link>
                                        <Link className="nav-link" to='fotos'>Gallery</Link>
                                        <Link className="nav-link" to='/about'>Info</Link>
                                        <Link className="nav-link" to='/newsItems'>News</Link>

                                        <LoginModal title={window.localStorage.getItem('username')?window.localStorage.getItem('username').replace(/['"]+/g, ''):"guest" }/>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <span className="small">Silvermusic Huissen</span>
                            <Switch>
                                <Route exact path="/" component={Home} />          
                                {/* <Route path="/playlist" component={PlayList} />  */}
                                <Route path="/playlist" children = {<PlayList groupName = {this.groupName} parentName="Silvermusic" groupNameList= {this.groupNameList}/>} />               
                                <Route path="/newsItems" children = {<NewsItems pageFilter="message" groupName = {this.groupName} parentName="Silvermusic" groupNameList= {this.groupNameList}/>} />                    
                                <Route path="/fotos" children = {<FotoGallery groupName = {this.getGroupName()} parentName="Silvermusic" groupNameList= {this.groupNameList}/>} />               
                                <Route path="/home"children = {<Home groupName = {this.groupName} parentName="Silvermusic" groupNameList= {this.groupNameList}/>} />                    
                                <Route path="/about" component={About} /> 
                                <Route path="/test" component={Test} />  
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;