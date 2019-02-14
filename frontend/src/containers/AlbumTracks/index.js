import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Search from '../../components/Search';
import { getAlbumTracks } from '../../action';
import IndexItem from './indexItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// I could make dispatch action to fetch all tracks for my playlist
// beforehand ,but I thought it would unnecessary because  a user 
// will most likely not click every playlist so I fetch individually
// whenever a user clicks.

class AlbumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: null,
            album: null,
            playlist: null,
            search: '',
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
                    currentSong: previewUrl,
                    image: null,
                })
            }
        }
    }

    componentDidMount() {
        // fetch tracks of this playlist
        const { match, getAlbumTracks } = this.props;
        const albumId = match.params.id;
        getAlbumTracks(albumId);
        // when users leave the page stop music
        window.onpopstate =  () => {
            this.resetAudio();
        };
    }

    resetAudio = () => {
        if (!this.state.audio) return;
        this.state.audio.pause();
        this.setState({
                audio: null,
                playing: false,
                currentSong: false,
        });

    }

    

    filterTracks = () => {
        // search bar searches for matching names and artists
        const { search } = this.state;
        const { albumTracks: tracks } = this.props;
        return tracks.filter(track => {
            const name = track.name.toLowerCase();
            let artists = '';
            const trackArtist = track.artists;

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

        const {  search, sorted, currentSong } = this.state;
        // if loading
        const { albumTracks: tracks, album } = this.props;
        
        if (!tracks ) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        const items = this.filterTracks();
        const resultTracks = <IndexItem listSubheader='Playlist' playAudio = { this.playAudio }
                                        items ={ items } currentSong = { currentSong } album={ album }/>
        return (
            <div>
                <div id='track-header'>
                    <h1 className='login-title'>{album.name}</h1>
                </div>
                <div id='detail-container'>
                    <Search value={ search } onChange = {this.handleChange}/>
                        <div id='detail-buttons'>
                            <div></div>
         
                            <a href="#" className='home-link' onClick={this.goHome}>Go back home</a>
                        </div>

                    { resultTracks }
                </div>

            </div>
        );

        
    }
}

const msp = state => ({
    accessToken: state.accessToken,
    albumTracks: state.albumTracks,
    album: state.album,
});

const mdp = dispatch => ({
    getAlbumTracks: id => dispatch(getAlbumTracks(id)),
})

export default connect(msp, mdp)(withRouter(AlbumPage));

