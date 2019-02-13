import React from 'react';
import { connect } from 'react-redux';
import Search from '../../../components/Search';
import Loading from '../../../components/Loading';
import IndexItem from './indexItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

    // componentDidMount() {
    //     // when users leave the page stop music
    //     window.onpopstate = () => {
    //         debugger
    //     };
    // }
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
    

    handleChange = (e) => {
        this.setState({search: e.target.value});
    }

    render() {
        const { search, loading, result, sorted, } = this.state;
        // if loading
          if (loading) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        let items;
        let resultTracks;
        if (result) {
                items = this.sortByPopularity(result);
                resultTracks = <IndexItem listSubheader='Playlist' playAudio = { this.props.playAudio }
                                                items ={ items } currentSong = { this.props.currentSong }/>
        }

        let sortButton = sorted ? 'Unsort' : 'Sort by Popularity'

        return (
            <div className='detail-container'>
                <form className= 'searchbar-form' onSubmit={this.handleSubmit}>
                    <Search onChange={this.handleChange} value= {search}/>
                </form>
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
                        </div>
                {resultTracks}

            </div>

        );

    }
}

const msp = state => ({
    accessToken: state.accessToken
});

export default connect(msp, null)(SearchSong);


