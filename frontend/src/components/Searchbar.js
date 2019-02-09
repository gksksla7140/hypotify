import React from 'react';


export default ({ handleChange, value }) => {
    return (
        <div className='searchbar-container'>
            <input 
            className ='searchbar' 
            type="text" name="search" 
            placeholder="Search.."
            onChange= { handleChange }
            value = {value}
            />    
        </div>

    );
}