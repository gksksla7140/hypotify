import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button'


class Login extends Component {

   handleClick = () => {
       // Will hit our backend and log in to spotify
    //    this.props.history.push('/signup');
    window.location = 'http://localhost:5000/login'
   }

    render() {
        return (
        <div className="login">
            <div id='login-gradient-1'></div>
            <div id='login-gradient-2'></div>
            <h1 className='login-title'> Welcome to Hypotify</h1>
            <Button variant="contained" 
                    color='primary'
                    size = "large"
                    className='button'
                    onClick={this.handleClick}
                    >
                Link My Spotify
            </Button>
        </div>
        );
    }
}

export default withRouter(Login);

