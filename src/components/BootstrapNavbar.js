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
    

    version = "2.02"

    parentName = "Silvermusic" 


    groupNameList = ['Huusband1', 'Huusband2', 'WasbordBand']  // Dit moet worden vervangen door een fetch naar de database.
  
    getGroupName = () => {
        let group = window.localStorage.getItem('groupName')
        return group ? JSON.parse(group) :  this.groupNameList[0];
    }
    groupName = this.getGroupName();

    getUsername = () => {
        let username = window.localStorage.getItem('username')
        return username ? JSON.parse(username) : 'guest' // standaard 
    }
    username = this.getUsername();

    getCode = () => {  // = password 
        let code = window.localStorage.getItem('code')
        return code ? JSON.parse(code) : '10' // standaard
    }
   code = this.getCode();


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
                                        <Link className="nav-link" to='/home'><FaHome size={30} style={{ color: 'white' }} /> <span className="xxSmall">Home V2.01</span> {" "} </Link>
                                        <Link className="nav-link" to='/playList'>Songs</Link>
                                        <Link className="nav-link" to='fotos'>Gallery</Link>
                                        <Link className="nav-link" to='/about'>Info</Link>
                                        <Link className="nav-link" to='/newsItems'>News</Link>
                                        <LoginModal parentName={this.parentName} groupName={this.groupName} username={this.username} code={this.code} />
                                    </Nav>

                                </Navbar.Collapse>
                                {/* <p className='red'> {"group:"} {this.groupName} {"  user:"} {this.username} {"  code:"} {this.code}</p> */}
                            </Navbar>
                            <span className="small">Silvermusic Huissen </span><span className='xxSmall'>{this.version}</span>
                            <Switch>
                                <Route exact path="/" component={Home} />          
                                {/* <Route path="/playlist" component={PlayList} />  */}
                                <Route path="/playlist" children = {<PlayList code={this.code} username={this.username} groupName={this.groupName} parentName={this.parentName} groupNameList={this.groupNameList}/>} />               
                                <Route path="/newsItems" children = {<NewsItems pageFilter="message" groupName={this.groupName} parentName={this.parentName} groupNameList= {this.groupNameList}/>} />                    
                                <Route path="/fotos" children = {<FotoGallery code={this.code} username={this.username} groupName={this.groupName} parentName={this.parentName} groupNameList={this.groupNameList}/>} />               
                                <Route path="/home"children = {<Home groupName = {this.groupName} parentName={this.parentName} groupNameList= {this.groupNameList}/>} />                    
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