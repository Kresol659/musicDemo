import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import AddComment from '@material-ui/icons/AddComment';
import ScreenShare from '@material-ui/icons/ScreenShare';
import SaveAlt from '@material-ui/icons/SaveAlt';

const styles = theme => ({
    badge: {
        top: -8,
        right: -15,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
        fontSize:'.1rem',
        backgroundColor:'#80cbc4',
        width:'1.3rem',
        height:'1.2rem'
    },
});

function CustomizedBadge(props) {
    const { classes } = props;

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem' }}>
            <IconButton aria-label="docment">
                <Badge badgeContent={50} color="primary" classes={{ badge: classes.badge }}>
                    <CreateNewFolder style={{ fontSize: '2rem', color: '#4aedc4' }} />
                </Badge>
            </IconButton>
            <IconButton aria-label="answer">
                <Badge badgeContent={'999+'} color="primary" classes={{ badge: classes.badge }}>
                    <AddComment style={{ fontSize: '2rem', color: '#4aedc4' }} />
                </Badge>
            </IconButton>
            <IconButton aria-label="share">
     
                    <ScreenShare style={{ fontSize: '2rem', color: '#4aedc4' }} />

            </IconButton>
            <IconButton aria-label="down">
            
                    <SaveAlt style={{ fontSize: '2rem', color: '#4aedc4' }} />
            </IconButton>
        </div>
    );
}

CustomizedBadge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedBadge);