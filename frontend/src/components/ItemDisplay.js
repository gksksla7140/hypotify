import React from 'react';


export default  (item, idx) => {
        const { name, popularity, artists, album} = item;
        const images = album.images;
        const style = {
            width: images[1].width,
            height: images[1].height,
            backgroundImage: `url(${images[1].url})` 
        }
        let artistsStr = '';
        artists.forEach((artist, idx) => {
            if (idx === artists.length -1) {
                artistsStr += artist.name
            } else  {
                artistsStr += artist.name + ', '
            }
        });  
        return (
            <div className='item-index' key={ idx }>
                <div style={style}/>
                <div className ='item-detail'>
                    <div>Name:</div>
                    <div>{name}</div>
                    <div>Popularity:</div>
                    <div>{popularity}</div>
                    <div>Artists</div>
                    <div>{artistsStr}</div>
                </div>
            </div>

        );
    }