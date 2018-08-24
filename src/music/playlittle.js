import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';


const styles = theme => ({
    badge: {
        top: 1,
        right: -15,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
    },
});

function CustomizedBadge(props) {
    const { classes } = props;

    return (
        <IconButton aria-label="docment">
            <PlayCircleOutline style={{ fontSize: '2rem', color: '#4aedc4' }} />
        </IconButton>
    );
}

CustomizedBadge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedBadge);