import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const items = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarGridList(props) {
    const { classes, items, history, listSubheader, width } = props;
    const getGridListCols = () => {
        if (isWidthUp('xl', width)) {
        return 4;
        }

        if (isWidthUp('lg', width)) {
        return 3;
        }

        if (isWidthUp('md', width)) {
        return 2;
        }

        return 1;
    }
    const getCellHeight = () => {
        if (isWidthUp('xl', width)) {
        return 200;
        }

        if (isWidthUp('lg', width)) {
        return 400;
        }

        if (isWidthUp('md', width)) {
        return 400;
        }

        return 400;
    }

    const navToDetailPage = (idx, name ) => {
        // navigate to the detail page when clicked
        history.push(`Album/${idx}`)
    }
    return (
        <div className={classes.root}>
        <GridList cellHeight={getCellHeight()} cols={getGridListCols()} spacing={15} className={classes.gridList}>
            <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div">{listSubheader}</ListSubheader>
            </GridListTile>
            {items.map((el, idx) => {
            return<Tooltip title={el.name} key={el.images[0].url}>
                <GridListTile key={el.images[0].url} onClick={ navToDetailPage.bind(null, el.id) }>
                    <img src={el.images[0].url} alt='list-image' />
                    <GridListTileBar
                    title={el.name}
                    subtitle={<span>by: {el.artists[0].name}</span>}
                    actionIcon={
                        <IconButton className={classes.icon}>
                        <InfoIcon />
                        </IconButton>
                    }
                    />
                </GridListTile>
            </Tooltip>
})}
        </GridList>
        </div>
    );
}


export default withRouter(withWidth()(withStyles(styles)(TitlebarGridList)));