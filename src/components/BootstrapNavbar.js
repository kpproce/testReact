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
  import fotosBasic from './fotosBasic';
  import VideoPlayer from './VideoPlayer';
  import LoginModal from './LoginModal';
  import UploadModal from './UploadModal';
  import ListFileNamesViaAPI from './ListFileNamesViaAPI';
  import TestParentCallback from './TestParentCallback';
  import Test_API_checkAccessCode from './Test_API_checkAccessCode';
  import  NewsItems from './NewsItemsV1';
  import  About from './About';
 
  import {FaHome} from 'react-icons/fa';
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
                            <Navbar bg="dark" variant="dark" /*expand="lg"*/ sticky="top">
                                <span className="menuWebsiteName small"> </span>      
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto"> 
                                        <Link className="nav-link" to='/home'><FaHome size={30} style={{ color: 'white' }} /> <span className="xSmall">Home</span> {" "} </Link>
                                        <Link className="nav-link" to='/playList'>Songs</Link>
                                        <Link className="nav-link" to='fotos'>Gallery</Link>
                                        <Link className="nav-link" to='/about'>Info</Link>
                                        <Link className="nav-link" to='/NewsItems'>News</Link>

                                        {/* <Link className="nav-link" to='/UploadFile'>Upload</Link> */}
                                        {/* <NavDropdown title="Overig" id="basic-nav-dropdown"> 
                                            <NavDropdown.Item as={Link} to='/UploadModal'>UploadTest</NavDropdown.Item> 
                                            <NavDropdown.Item as={Link} to='/TestLocalStorage'>TestLocalStorage</NavDropdown.Item>  
                                            <NavDropdown.Item as={Link} to='/Test_API_checkAccessCode'>Test_API_checkAccessCode</NavDropdown.Item>  
                                            <NavDropdown.Item as={Link} to='/playlistOld'> PlayList Oud</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to='/testAPIPAR'>test API Parameters</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to='/ListFileNamesViaAPI'> ListFileNamesViaAPI</NavDropdown.Item> 
                                            <NavDropdown.Item as={Link} to='/player'> Video vb</NavDropdown.Item> 
                                            <NavDropdown.Item as={Link} to='/test'>test</NavDropdown.Item>                                             
                                      
                                        </NavDropdown>   */}
                                        <LoginModal title={window.localStorage.getItem('username')?window.localStorage.getItem('username').replace(/['"]+/g, ''):"guest" }/>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <span className="small">Silvermusic Huissen</span>
                            <Switch>
                                <Route exact path="/" component={Home} />          
                                <Route path="/playlist" component={PlayList} />   
                              
                                <Route path="/messages" component={Messages} />       
                                <Route path="/fotos" component={fotosBasic} />       
                                <Route path="/home" component={Home} />  
                                <Route path="/video" component={VideoPlayer} /> 
                                <Route path="/about" component={About} /> 
                                <Route path="/test" component={Test} /> 
                                <Route path="/playListOld" component={SongList3TableFilter} />      
                                <Route path="/ListFileNamesViaAPI" component={ListFileNamesViaAPI} /> 
                                <Route path="/TestParentCallback" component={TestParentCallback} /> 
                                <Route path="/UploadModal" component={UploadModal} /> 
                                <Route path="/testAPIPAR" component={Test_API_TestParametersPHP} />   
                                <Route path="/Test_API_checkAccessCode" component={Test_API_checkAccessCode} />             
                                <Route path="/NewsItems" children={<NewsItems pageFilter="message" />} />             
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