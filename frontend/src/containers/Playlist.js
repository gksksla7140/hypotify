import React from 'react';
import { withRouter } from 'react-router-dom';
import PlaylistItem from './PlaylistItem';
import Search from '../components/Search';
import GridList from '../components/GridList';

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
        const lists = <GridList listSubheader='Playlist' items ={ this.filterItems() }/>

        return (
            <div className='playlist-index-container'>
                <Search onChange={ this.handleChange } value = { this.state.search }/>
                    {lists}
            </div>
        );

    }
}

export default withRouter(Playlist);