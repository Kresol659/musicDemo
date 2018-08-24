import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { preIP, localIP } from './IP'
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
window.onload = function () {

}

function ListDividers(props) {
  const { classes } = props;
  console.log(props)
  let state;
  if (props.recentMusic) {
    state = props.recentMusic.length;
  } else {
    state = 0
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button onClick={props.toLocalMusic.bind(this, 'local')}>
          <span><img src={preIP + '/images/music.png'} style={{ width: '1.2rem' }} alt="" /></span>
          <ListItemText primary="本地音乐" />
          <span style={{ color: 'rgb(141, 138, 138)', marginRight: '1rem' }}>{props.allmusic.length}</span>
          <span><img src={preIP + '/images/right_arrow.png'} style={{ width: '1rem' }} alt="" /></span>
        </ListItem>
        <Divider />
        <ListItem button divider onClick={toRecent}>
          <span><img src={preIP + '/images/recentplay.png'} style={{ width: '1.2rem' }} alt="" /></span>
          <ListItemText primary="最近播放" />
          <span style={{ color: 'rgb(141, 138, 138)', marginRight: '1rem' }}>{state}</span>
          <span><img src={preIP + '/images/right_arrow.png'} style={{ width: '1rem' }} alt="" /></span>
        </ListItem>
        <ListItem button>
          <span><img src={preIP + '/images/diantai.png'} style={{ width: '1.2rem' }} alt="" /></span>
          <ListItemText primary="我的电台" />
          <span><img src={preIP + '/images/right_arrow.png'} style={{ width: '1rem' }} alt="" /></span>
        </ListItem>
        <Divider light />
        <ListItem button>
          <span><img src={preIP + '/images/mycollect.png'} style={{ width: '1.2rem' }} alt="" /></span>
          <ListItemText primary="我的收藏" />
          <span><img src={preIP + '/images/right_arrow.png'} style={{ width: '1rem' }} alt="" /></span>
        </ListItem>
      </List>
    </div>
  );
}

function toRecent() {
  window.location.href = localIP + '/#/main/recentplay';
}






ListDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListDividers);