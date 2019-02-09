import React, { Component } from 'react';
import './stylesheet/App.scss';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import store from "./store";
import { AuthRoute, ProtectedRoute } from './util/route_util';



import Login from './containers/Login';
import User from './containers/User';
import Home from './containers/Home';
import DetailPage from './containers/DetailPage';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store}>
          <Router>
              <Switch>
                  <AuthRoute exact path="/login" component={ Login } />
                  <AuthRoute exact path="/user/:accessToken/:refreshToken" component={ User } />
                  <ProtectedRoute exact path="/" component={ Home } />
                  <ProtectedRoute exact path="/playlist/:id" component={ DetailPage }/>
                  <Redirect to="/login" />
              </Switch>
            </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
