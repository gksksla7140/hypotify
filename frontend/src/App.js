import React, { Component } from 'react';
import './stylesheet/App.scss';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import store from "./store";
import { AuthRoute, ProtectedRoute } from './util/route_util';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// pages
import Login from './containers/Home/Login';
import User from './containers/Home/User';
import Home from './containers/Home/Home';
import PlaylistTracks from './containers/PlaylistTracks/index';
import AlbumTracks from './containers/AlbumTracks/index';

// create Color pallets for styles// 
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1ED760',
      contrastText: '#fff',
    }, // Purple and green play nicely together.
    secondary: {
      main: '#4bdf80',
      contrastText: '#fff',
    }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});


class App extends Component {
  render() {
    return (
      <div className='App'>
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <Router>
                <Switch>
                    <AuthRoute exact path="/login" component={ Login } />
                    <AuthRoute exact path="/user/:accessToken/:refreshToken" component={ User } />
                    <ProtectedRoute exact path="/" component={ Home } />
                    <ProtectedRoute exact path="/playlist/:id" component={ PlaylistTracks }/>
                    <ProtectedRoute exact path="/Album/:id/" component={ AlbumTracks }/>
                    <Redirect to="/login" />
                </Switch>
              </Router>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
