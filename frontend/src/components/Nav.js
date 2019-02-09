import React from 'react';

export default ({ options, selected, handleClick }) => { 
    // current Nav selected?
    const active = (op, idx) => {
        const className = idx === selected ? 
        'nav-item item active' :
        'nav-item item'
        return <div key={ idx } 
                className={ className }
                onClick={ handleClick.bind(null, idx) }
                >{op}</div>
    }

    const navs = options.map((op, idx) => active(op,idx))
    return (
        <nav className="nav nav-pills nav-fill">
           {navs}
        </nav>
    );
}

