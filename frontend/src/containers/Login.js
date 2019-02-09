import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';



class Login extends Component {

   handleClick = () => {
       // Will hit our backend and log in to spotify
    //    this.props.history.push('/signup');
    window.location = 'http://localhost:5000/login'
   }

    render() {
        return (
        <div className="login">
            <h1 className='login-title'> Welcome to Hypotify</h1>

            <button 
            type="button" 
            onClick={this.handleClick}
            className="btn btn-success btn-lg">Link my Spotify Profile</button>
        </div>
        );
    }
}

export default withRouter(Login);

