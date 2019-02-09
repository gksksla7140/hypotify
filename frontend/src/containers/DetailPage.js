import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import displayTrack from '../components/ItemDisplay';
import Search from '../components/Searchbar';

// I could make dispatch action to fetch all tracks for my playlist
// beforehand ,but I thought it would unnecessary because  a user 
// will most likely not click every playlist so I fetch individually
// whenever a user clicks.

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: null,
            error: null,
            playlist: null,
            search: '',
            sorted: false,
        }
    }

    handleChange = (e) => {
        this.setState({search: e.target.value});
    }

    goHome=() => {
        this.props.history.push('/');
    }

    componentDidMount() {
        // fetch tracks of this playlist
        const { match, accessToken, playlists } = this.props;
        const playlist = playlists[match.params.id];


        fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(res =>
            res.json())
        .then(res => {
            this.setState({tracks: res.items, playlist})})
        .catch(err => {
            this.setState({error: err})});
    }
    
    //toggle sort
    sort = () => {
        this.setState({sorted: !this.state.sorted});
    }

    sortByPopularity = (tracks) => {
        const { sorted } = this.state;
        if (!sorted) return tracks;
        return tracks.sort((a,b) => b.track.popularity - a.track.popularity )
    }

    filterTracks = () => {
        // search bar searches for matching names and artists
        const { tracks, search } = this.state;
        return tracks.filter(track => {
            const name = track.track.name.toLowerCase();
            let artists = '';
            const trackArtist = track.track.artists;

            trackArtist.forEach((artist, idx) => {
                artists += idx >= trackArtist.length - 1 ? 
                artist.name.toLocaleLowerCase() 
                : `${artist.name.toLocaleLowerCase()}##`
            });
            
            if (name.includes(search.toLocaleLowerCase())) {
                return true;
            } else if (artists.includes(search.toLocaleLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
    }

    render() {
        const { tracks, playlist, search, sorted } = this.state;
        // if loading
        if (!tracks) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        const items = this.sortByPopularity(this.filterTracks()).map((track, idx) => displayTrack(track.track, idx));
        let sortButton = sorted ? 'Unsort' : 'Sort by Popularity'
        return (
            <div className='detail-container'>
                {/* Header */}
                <div className='track-header'>
                    <h1 className='login-title'>{playlist.name}</h1>
                </div>
                {/* Search Bar */}
                <Search value={ search } handleChange = {this.handleChange}/>
                {/* Sort Button */}
                <button onClick={this.sort} className="btn btn-outline-primary">{sortButton}</button>
                {/* Home Link */}
                <a href="#" className='home-link' onClick={this.goHome}>Go back home</a>
                {/* Index List */}
                <div className='track-index'>
                    {items}
                </div>
            </div>
        );

        
    }
}

const msp = state => ({
    playlists: state.playlist.items,
    accessToken: state.accessToken

});

export default connect(msp, null)(withRouter(DetailPage));

