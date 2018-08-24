import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

const styles = {
    root: {
        width: '100%',
        background: 'linear-gradient(45deg,#232526,#414345)'
    },
    text: {
        color: '#4aedc4'
    },
};

class LabelBottomNavigation extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            value: 'index',
        }
    }

    handleChange = (event, value) => {
        if (this.state.value !== value) {
            let path = '';
            if (value === 'index') {
                path = '/main/index';
            } else if (value === 'mymusic') {
                path = '/main/mymusic';
            } else if (value === 'friends') {
                path = '/main/friends';
            } else if (value === 'accounts') {
                path = '/main/personal';
            }
            this.props.history.push(path)
            this.setState({ value });
        }

    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation value={value} onChange={this.handleChange.bind(this)} className={classes.root}>
                <BottomNavigationAction label="发现" value="index" icon={<Icon>youtube_searched_for</Icon>} className={classes.text} />
                <BottomNavigationAction label="我的音乐" value="mymusic" icon={<Icon>queue_music</Icon>} className={classes.text} />
                <BottomNavigationAction label="朋友" value="friends" icon={<Icon>supervisor_account</Icon>} className={classes.text} />
                <BottomNavigationAction label="帐号" value="accounts" icon={<Icon>person_outline</Icon>} className={classes.text} />
            </BottomNavigation>
        );
    }
}

LabelBottomNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);