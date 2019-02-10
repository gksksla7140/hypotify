import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: '#1ED760',
    fontSize: 16,
    fontWeight: 700,
    lineHieght: 1,
    minWidth: 160,
    borderRadius: 50,
    border: 0,
    color: 'white',
    height: 56,
    padding: '0 65px',
    },
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={classNames(classes.root, className)} {...other}>
      {children || 'class names'}
    </Button>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);