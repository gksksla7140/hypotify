import React from 'react';
import { connect } from 'react-redux';
import Greeting from '../components/Greeting';
import Playlist from './Playlist';
import Nav from '../components/Nav';
import SearchSong from './SearchSong';
import SearchAlbum from './SearchAlbum';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
        }
    }

    handleClick = idx => {
        this.setState({selected: idx});
    }

    navContent = () => {

        const { playlists } = this.props;

        switch (this.state.selected) {
            case 0:
                return <Playlist playlists = { playlists.items }/>
            case 1:
                return <SearchSong type='track'/>
            case 2:
                return <SearchAlbum type='album'/>
            default:
                 return <Playlist playlists = { playlists.items }/>
        }

    }


    render() {
        const { user } = this.props;
        const { selected } = this.state;
        const navs = ['My Playlist', 'Search Song', 'Search Album']
        return (
            <div className='home-container'>
                <Greeting name = { user.display_name }/>
                <Nav options={navs} selected={ selected } handleClick={ this.handleClick }/>
                {this.navContent()}
            </div>
        );
    }
}

const msp = state => ({
    user: state.user,
    playlists :state.playlist
})

export default connect(msp, null)(Home);