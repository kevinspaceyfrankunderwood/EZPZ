import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import { Switch, Route } from 'react-router-dom';
import FetchUser from './FetchUser';
import Activities from './Activities';
import Itinerary from './Itinerary';
import '../styles/every_component.css';
import AboutUs from './AboutUs';
import Profile from './Profile';
import Contact from './Contact';
import Children from './Children';
import LoginFirst from './LoginFirst';
import Footer from './Footer'



class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/aboutus' component={AboutUs} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/children' component={Children} />
            <Route exact path='/initial-login' component={LoginFirst} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/contact' component={Contact} />
            <ProtectedRoute exact path='/itinerary' component={Itinerary} />
            <ProtectedRoute exact path='/activities' component={Activities} />
            <ProtectedRoute exact path='/profile' component={Profile} />
            <ProtectedRoute exact path='/home' component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </FetchUser>
        <Footer />
      </div>
    );
  }
}

export default App;
