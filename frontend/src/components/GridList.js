import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
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
    const { classes, items, history, listSubheader } = props;

    const navToDetailPage = (idx) => {
        // navigate to the detail page when clicked
        history.push(`playlist/${idx}`)
    }
    return (
        <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">{listSubheader}</ListSubheader>
            </GridListTile>
            {items.map((el, idx) => (
            <GridListTile key={el.images[1].url} onClick={ navToDetailPage.bind(idx) }>
                <img src={el.images[1].url} alt='list-image' />
                <GridListTileBar
                title={el.name}
                subtitle={<span>by: {el.owner.display_name}</span>}
                actionIcon={
                    <IconButton className={classes.icon}>
                    <InfoIcon />
                    </IconButton>
                }
                />
            </GridListTile>
            ))}
        </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  listSubheader: PropTypes.string.isRequired
};

export default withRouter(withStyles(styles)(TitlebarGridList));