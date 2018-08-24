import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EnhancedEncryption from '@material-ui/icons/EnhancedEncryption';
import Button from '@material-ui/core/Button';
import './css/main.css';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
//IP
import { preIP, localIP } from './IP.js'
axios.defaults.withCredentials = true;
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
        marginLeft: '3rem'
    },
    button: {
        margin: theme.spacing.unit,
    },
});


function Login(props) {
    const { classes } = props;
    return (
        <div>
            <div className="goback">
                <Button color="primary" className={classes.button} onClick={goBack}>
                    <Icon className={classes.midIcon}>arrow_back_ios</Icon>
                </Button>
                <span className="login_title">
                    登录
                    </span>
            </div>
            <div className="login_main">

                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField id="account" label="帐号" name="uname" />
                        </Grid>
                    </Grid>
                </div>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <EnhancedEncryption />
                        </Grid>
                        <Grid item>
                            <TextField id="pwd" type="password" label="密码" name="upwd" />
                        </Grid>
                    </Grid>
                </div>
                <div className="login_btn">
                    <Button variant="contained" size="large" color="primary" className={classes.button} onClick={LoginNow}>
                        登录
                    </Button>
                </div>
                <div className="go_reg">
                    <Button variant="outlined" size="small" color="primary" className={classes.button} onClick={goReg}>
                        前往注册
                    </Button>
                </div>
            </div>
        </div>
    );
}
function LoginNow() {
    axios.post(preIP + '/music/checkLogin', {
        uname: document.getElementById('account').value,
        upwd: document.getElementById('pwd').value
    }).then((msg) => {
        if (msg.data == 'OK') {
            window.location.href = localIP + '/#/main/index'
        } else {
            window.location.href = localIP + '/#/login'
        }
    })
}
function goReg() {
    window.location.href = localIP + '/#/reg'
}
function goBack() {
    window.history.back();
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);