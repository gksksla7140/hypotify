import React from 'react';
import { connect } from 'react-redux';
import Search from '../../../components/Searchbar';
import Loading from '../../../components/Loading';
import AlbumDisplay from '../../../components/AlbumDisplay';

class SearchAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            loading: false,
            result: null,
        }
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
            this.setState({loading: false, result: res.albums.items})
        })
        
    }

    handleChange = (e) => {
        this.setState({search: e.target.value});
    }

    render() {
        const { search, loading, result } = this.state;
        // if loading
          if (loading) {
            return (
            <div className='user-container'>
                < Loading type = 'bubbles' color='black'/>
            </div>)
        }
        let items;
        if (result) {
            items = result.map((track, idx) => AlbumDisplay(track, idx));
        }

        return (
            <div className='detail-container'>
                <form className='searchbar-form' onSubmit={this.handleSubmit}>
                    <Search handleChange={this.handleChange} value= {search}/>
                </form>
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

export default connect(msp, null)(SearchAlbum);


