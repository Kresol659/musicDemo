import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function OutlinedButtons(props) {
    const { classes } = props;
    return (
            <Button color="primary" className={classes.button} onClick={goBack}>
                <Icon className={classes.rightIcon} style={{color:"#fff"}}>arrow_back_ios</Icon>
            </Button>
    );
}
function goBack() {
    window.history.back();
}
OutlinedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);