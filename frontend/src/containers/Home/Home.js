import React from 'react';
import { connect } from 'react-redux';
import Greeting from '../../components/Greeting';
import Nav from '../../components/Nav';
import Playlist from './Playlist';
import SearchSong from './SearchSong';
import SearchAlbum from './SearchAlbum';


class Home extends React.Component {
    state = {
        currentSong: null,
        audio: null,
        playing: false,
    }

    playAudio = (previewUrl) => {
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

    resetAudio = () => {
        if (this.state.audio) {
            this.state.audio.pause();
            this.setState({
                audio: null,
                playing: false,
                currentSong: false,
            });
        }

    }

    render() {
        const { currentSong, audio, playing } = this.state;
        const { user, playlists } = this.props;
        const navContent = [ <Playlist playlists = { playlists.items }/>, 
                            <SearchSong type='track' 
                            playAudio={ this.playAudio }
                            currentSong ={ currentSong }
                            audio = { audio }
                            playing = { playing }
                            />,
                            <SearchAlbum type='album'/>,
                        ]
        return (
            <div className='home-container'>
                <Greeting name = { user.display_name }/>
                <Nav navContent={ navContent } resetAudio={ this.resetAudio }/>
            </div>
        );
    }
}

const msp = state => ({
    user: state.user,
    playlists :state.playlist
})

export default connect(msp, null)(Home);