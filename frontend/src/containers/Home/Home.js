import React from 'react';
import { connect } from 'react-redux';
import Greeting from '../../components/Greeting';
import Nav from '../../components/Nav';
import Playlist from './Playlist';
import SearchSong from './SearchSong';
import SearchAlbum from './SearchAlbum';


class Home extends React.Component {

    render() {
        const { user, playlists } = this.props;
        const navContent = [ <Playlist playlists = { playlists.items }/>, 
                            <SearchSong type='track'/>,
                            <SearchAlbum type='album'/>,
                        ]
        return (
            <div className='home-container'>
                <Greeting name = { user.display_name }/>
                <Nav navContent={ navContent }/>
            </div>
        );
    }
}

const msp = state => ({
    user: state.user,
    playlists :state.playlist
})

export default connect(msp, null)(Home);