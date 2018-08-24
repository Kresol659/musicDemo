import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Reorder from '@material-ui/icons/Reorder'
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import './css/main.css';
import Switch from './Switch.js';
//IP
import { preIP, localIP } from './IP.js'
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
class TemporaryDrawer extends Component {
    constructor(p) {
        super(p)
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            user: {},
            headDefault: {
                display: 'block'
            }

        }
    }


    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes } = this.props;

        const sideList = (
            <div className={classes.list} id="drawM" >
                <List>
                    <div className="showUserHead">
                        <div style={this.state.headDefault} onClick={this.goToLogin.bind(this)}>
                            <IconButton style={{ width: '8rem' }}>
                                <AccountCircle style={{ fontSize: '3rem', color: '#b2dfdb' }} />
                                <span style={{ fontSize: '1rem', marginLeft: '.8rem' }}>登录</span>
                            </IconButton>
                        </div>
                        <div>
                            <img src={preIP + this.state.user.uhead} alt="" />
                        </div>
                        <div className="showUserInfo">
                            <p>{this.state.user.uname}</p>
                            <p>{this.state.user.email}</p>
                        </div>
                    </div>
                </List>

                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="个性装扮" />
                        <span style={{ fontSize: '.8rem', color: '#33ab9f', fontWeight: 600 }}>默认套装</span>
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="消息中心" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="免流量服务" />
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="定时关闭" />
                        <Switch />
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="流量提醒" />
                        <Switch />
                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="听歌偏好" />

                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="微云音乐网盘" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="导入外部歌单" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="清理空间" />

                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="帮助与反馈" />

                    </ListItem>

                    <ListItem button>
                        <ListItemText primary="关于" />

                    </ListItem>
                    <ListItem style={{ padding: '.2rem 0' }}>
                        <IconButton style={{ width: '5rem' }}>
                            <SettingsApplications />
                            <span style={{ fontSize: '.8rem', paddingLeft: '.2rem' }}>设置</span>
                        </IconButton>
                        <IconButton style={{ width: '8rem' }}>
                            <ExitToApp />
                            <span style={{ fontSize: '.8rem', marginLeft: '.8rem' }}>退出登录/关闭</span>
                        </IconButton>
                    </ListItem>
                </List>
            </div >
        );
        return (
            <div>
                <IconButton aria-label="docment" onClick={this.toggleDrawer('left', true)}>
                    <Reorder style={{ fontSize: '2rem', color: '#fff', margin: '-.5rem 0 0 1rem' }} />
                </IconButton>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} style={{ backgroundColor: 'rgba(51, 135, 124,0.5)' }}>
                    <div
                        ref="listInfo"
                        tabIndex={0}
                        role="button"
                        style={{ backgroundColor: "#e6f4f3" }}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
    componentDidMount() {
        axios.post(preIP + '/music/getSession').then((msg) => {
            if (msg.data !== '') {
                this.setState({
                    user: msg.data,
                    headDefault: {
                        display: 'none'
                    }
                })
            }
            this.props.getData(msg.data);
        })
    }
    goToLogin() {
        window.location.href = localIP + '/#/login'
    }


}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);