import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import { getPlaylistTracks } from '../../action';
import IndexItem from './indexItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// I could make dispatch action to fetch all tracks for my playlist
// beforehand ,but I thought it would unnecessary because  a user 
// will most likely not click every playlist so I fetch individually
// whenever a user clicks.

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: null,
            playlist: null,
            search: '',
            sorted: false,
            audio: null,
            playing: false,
            currentSong: false,
        }
    }

    handleChange = e => {
        this.setState({search: e.target.value});
    }


    goHome = () => {
        this.props.history.push('/');
    }

    playAudio= (previewUrl) => {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio,
                currentSong: previewUrl,
            })
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false,
                    currentSong: false,
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio,
                    currentSong: previewUrl
                })
            }
        }
    }

    componentDidMount() {
        // fetch tracks of this playlist
        const { match, playlists, getPlaylistTracks, history } = this.props;
        const playlist = playlists[match.params.id];
        this.setState({ playlist });
        getPlaylistTracks(playlist);
        // when users leave the page stop music
        window.onpopstate =  () => {
            this.resetAudio();
        };
    }

    resetAudio = () => {
        this.state.audio.pause();
        this.setState({
                audio: null,
                playing: false,
                currentSong: false,
        });

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
        const { search } = this.state;
        const { playlistTracks: tracks } = this.props;
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

        const {  search, sorted, playlist, currentSong } = this.state;
        // if loading
        const { playlistTracks: tracks } = this.props;
        if (!tracks || !playlist) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        const items = this.sortByPopularity(this.filterTracks()).map((track, idx) => track.track);
        const resultTracks = <IndexItem listSubheader='Playlist' playAudio = { this.playAudio }
                                        items ={ items } currentSong = { currentSong }/>
        return (
            <div>
                <div id='track-header'>
                    <h1 className='login-title'>{playlist.name}</h1>
                </div>
                <div id='detail-container'>
                    <Search value={ search } onChange = {this.handleChange}/>
                        <div id='detail-buttons'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={sorted}
                                        onClick={this.sort}
                                        
                                        color="primary"
                                    />
                                }
                                label="Sort By Popularity"
                            />
                            <a href="#" className='home-link' onClick={this.goHome}>Go back home</a>
                        </div>

                    { resultTracks }
                </div>

            </div>
        );

        
    }
}

const msp = state => ({
    playlists: state.playlist.items,
    accessToken: state.accessToken,
    playlistTracks: state.playlistTracks
});

const mdp = dispatch => ({
    getPlaylistTracks: playlist => dispatch(getPlaylistTracks(playlist)),
})

export default connect(msp, mdp)(withRouter(DetailPage));

