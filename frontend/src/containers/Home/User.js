import React from 'react';
import {connect} from 'react-redux';
import {getUser, setTokens, getPlaylist} from '../../action';
import Loading from '../../components/Loading';

class User extends React.Component {
    
    componentDidMount = () => {
        // when it first loads we set token and user
        const  {getUser, match, setTokens} = this.props;       
        setTokens(match.params);
        getUser();
    }
    
    componentDidUpdate = (prevProps) =>{
        // recieve updated user's playlist
        const {user, getPlaylist} = this.props;
        if(prevProps.user !== user){
            getPlaylist(user.id);
        }
    }

    render() {
        return(
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>
        );


    }

}

const msp = state => ({
    user: state.user,
    playlist: state.playlist
});

const mdp = dispatch => ({
    getUser: ()=> dispatch(getUser()),
    setTokens: token => dispatch(setTokens(token)),
    getPlaylist: id => dispatch(getPlaylist(id))
})

export default connect(msp, mdp)(User);

