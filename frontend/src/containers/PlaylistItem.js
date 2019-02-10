import React from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(({ playlist, history, idx }) => {
    const { images, name } = playlist;
    // there are 3 images lg mid and small I will use mid size

    const style = {
        width: images[1].width,
        height: images[1].height,
        backgroundImage: `url(${images[1].url})`
    }

    const navToDetailPage = () => {
        // navigate to the detail page when clicked
        history.push(`playlist/${idx}`)
    }
    debugger


    return (
        <div className='playlist-item' onClick={ navToDetailPage }> 
            <div className='playlist-item-image' style = {style}>
                { name }
            </div> 
        </div>
    );
});