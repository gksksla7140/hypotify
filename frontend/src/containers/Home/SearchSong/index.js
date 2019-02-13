import React from 'react';
import { connect } from 'react-redux';
import Search from '../../../components/Search';
import Loading from '../../../components/Loading';
import ItemDisplay from '../../../components/ItemDisplay';

class SearchSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false,
            result: null,
            sorted: false,
        }
    }
    sort = () => {
        this.setState({sorted: !this.state.sorted});
    }

    sortByPopularity = (tracks) => {
        const { sorted } = this.state;
        if (!sorted) return tracks;
        return tracks.sort((a,b) => b.popularity - a.popularity )
    }

    handleSubmit = (e) => {
        const { accessToken, type } = this.props;
        const { search } = this.state;
        e.preventDefault();
        //start loading
        this.setState({loading: true});
        //fetch results
        fetch(`https://api.spotify.com/v1/search?q=${type}:${search}&type=${type}`, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(res=>
            res.json()
        )
        .then (res=> {
            this.setState({loading: false, result: res.tracks.items})
        })
        
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

    handleChange = (e) => {
        this.setState({search: e.target.value});
    }

    render() {
        const { search, loading, result, sorted } = this.state;
        // if loading
          if (loading) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        let items;
        if (result) {
            // items = this.sortByPopularity([...result]).map((track, idx) => ItemDisplay(track, idx));
                items = this.sortByPopularity(this.filterTracks()).map((track, idx) => track.track);
                const resultTracks = <IndexItem listSubheader='Playlist' playAudio = { this.playAudio }
                                                items ={ items } currentSong = { currentSong }/>
        }

        let sortButton = sorted ? 'Unsort' : 'Sort by Popularity'

        return (
            <div className='detail-container'>
                <form className= 'searchbar-form' onSubmit={this.handleSubmit}>
                    <Search onChange={this.handleChange} value= {search}/>
                </form>
                <button onClick={this.sort} className="btn btn-outline-primary">{sortButton}</button>
                <div className='track-index'>
                    {items}
                </div>
            </div>

        );

    }
}

const msp = state => ({
    accessToken: state.accessToken
});

export default connect(msp, null)(SearchSong);


