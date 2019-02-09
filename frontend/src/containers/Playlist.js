import React from 'react';
import { withRouter } from 'react-router-dom';
import PlaylistItem from './PlaylistItem';
import SearchBar from '../components/Searchbar';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange = (e) => {
        this.setState({search: e.target.value})
    }

    filterItems = () => {
        const { playlists } = this.props;
        const { search } = this.state;

        return playlists.filter( playlist => {
            const name = playlist.name.toLowerCase();
            return name.includes(search.toLocaleLowerCase());
        })
    }

    render() {
        const items = this.filterItems().map((playlist, idx) => (
            <PlaylistItem playlist = { playlist } idx = { idx } key = { idx }/>
        ));

        return (
            <div className='playlist-index-container'>
                <SearchBar handleChange = { this.handleChange } value ={this.state.search}/>
                <div className='playlist-index'>
                    {items}
                </div>
            </div>
        );

    }
}

export default withRouter(Playlist);