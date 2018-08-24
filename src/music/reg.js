import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import MailOutline from '@material-ui/icons/MailOutline';
import StayCurrentPortrait from '@material-ui/icons/StayCurrentPortrait';
import PersonOutline from '@material-ui/icons/PersonOutline';
import VpnKey from '@material-ui/icons/VpnKey';
import axios from 'axios';
import './css/main.css';
//IP
import { preIP, localIP } from './IP.js'
const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',

    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    cssLabel: {
        '&$cssFocused': {
            color: purple[500],
        },
    },
    cssFocused: {},
    cssUnderline: {
        width: 200,
        '&:after': {
            borderBottomColor: purple[500],
        },
    },
    midIcon: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});
const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];
let regChecked = {
    uname: false,
    upwd: false,
    upwdOk: false,
    phone: false,
    email: false
};
class InputAdornments extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            checked: {
                uname: '',
                upwd: '',
                upwdOk: '',
                phone: '',
                email: ''
            },
            checkReg: {
                uname: false,
                upwd: false,
                upwdOk: false,
                phone: false,
                email: false
            },
            errorColor: { color: 'green' },
            savepwd: '',
            imgUrl: '',
            type: ''

        }
    }
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    };
    //-------------------------------格式验证-----------------------------//
    handleChange = prop => event => {
        let reg, errorColor, param, val;
        val = event.target.value;
        param = {
            uname: '',
            upwd: '',
            upwdOk: '',
            phone: '',
            email: ''
        }

        switch (prop) {
            case 'uname':
                reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
                param[prop] = '字母开头，6-12位，允许字母数字下划线';
                errorColor = { color: 'red' }
                break;
            case 'upwd':
                reg = /^[a-zA-Z]\w{5,17}$/;
                this.state.savepwd = val;
                param[prop] = '字母开头，6-18位，只能包含字母、数字和下划线';
                errorColor = { color: 'red' }
                break;
            case 'upwdOk':
                reg = eval('/^' + this.state.savepwd + '$/');
                param[prop] = '密码不一致';
                errorColor = { color: 'red' }
                break;
            case 'phone':
                reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                param[prop] = '请输入正确的11位手机号';
                errorColor = { color: 'red' }
                break;
            case 'email':
                reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                param[prop] = '请输入正确的邮箱地址';
                errorColor = { color: 'red' }
                break;

        }
        if (reg.test(val)) {
            if (prop === 'uname') {
                axios.post('http://127.0.0.1:659/music/checkUname', { uname: val }).then((msg) => {
                    if (msg.data.length === 1) {
                        param[prop] = '用户名重复';
                        regChecked[prop] = false;
                        errorColor = { color: 'red' };
                        this.setState({ checked: param, errorColor, checkReg: regChecked });
                    } else {
                        param[prop] = '正确';
                        errorColor = { color: 'green' }
                        regChecked[prop] = true;
                        this.setState({ checked: param, errorColor, checkReg: regChecked });
                    }
                })
            }
            else {
                param[prop] = '正确';
                regChecked[prop] = true;
                errorColor = { color: 'green' }
                this.setState({ checked: param, errorColor, checkReg: regChecked });
            }

        }
        else {
            errorColor = { color: 'red' };
            regChecked[prop] = false;
            this.setState({ checked: param, errorColor, checkReg: regChecked });
        }
        this.setState({ [prop]: event.target.value });
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;

        return (
            <form action={preIP + '/music/addUser'} method="post">
                <div className="goback">
                    <Button color="primary" className={classes.button} onClick={this.goBack}>
                        <Icon className={classes.midIcon}>arrow_back_ios</Icon>
                    </Button>
                    <span className="reg_title">
                        注册
                    </span>
                </div>
                <div className="reg_main">
                    <div className={classes.container}>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                FormLabelClasses={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                                htmlFor="regAccount"
                            >
                                用户名
                        </InputLabel>
                            <Input
                                classes={{
                                    underline: classes.cssUnderline,
                                }}
                                id="regAccount"
                                onChange={this.handleChange('uname')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonOutline />
                                    </InputAdornment>
                                }
                                name="uname"
                            />
                            <FormHelperText id="unameError" style={this.state.errorColor}>{this.state.checked.uname}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.root}>
                        <FormControl className={classNames(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="adornment-password">密码</InputLabel>
                            <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('upwd')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKey />
                                    </InputAdornment>
                                }
                                name="upwd"
                            />
                            <FormHelperText id="upwdError" style={this.state.errorColor}>{this.state.checked.upwd}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.root}>
                        <FormControl className={classNames(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="passwordOk">确认密码</InputLabel>
                            <Input
                                id="passwordOk"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={this.handleChange('upwdOk')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VpnKey />
                                    </InputAdornment>
                                }

                            />
                            <FormHelperText id="upwdOk" style={this.state.errorColor}>{this.state.checked.upwdOk}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.container}>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                FormLabelClasses={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                                htmlFor="regPhone"
                            >
                                手机
                        </InputLabel>
                            <Input
                                classes={{
                                    underline: classes.cssUnderline,
                                }}
                                id="regPhone"
                                onChange={this.handleChange('phone')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <StayCurrentPortrait />
                                    </InputAdornment>
                                }
                                name="phone"
                            />
                            <FormHelperText id="phoneError" style={this.state.errorColor}>{this.state.checked.phone}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.container}>
                        <FormControl className={classes.margin}>
                            <InputLabel
                                FormLabelClasses={{
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                }}
                                htmlFor="regEmail"
                            >
                                邮箱
                        </InputLabel>
                            <Input
                                classes={{
                                    underline: classes.cssUnderline,
                                }}
                                id="regEmail"
                                onChange={this.handleChange('email')}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                }
                                name="email"
                            />
                            <FormHelperText id="emailError" style={this.state.errorColor}>{this.state.checked.email}</FormHelperText>
                        </FormControl>
                    </div>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="inputFile"
                        onChange={this.upDocment.bind(this)}

                    />
                    <input type="hidden" value={this.state.imgUrl} name="uhead" />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                            点击上传头像
                     </Button>
                    </label>
                    <div>
                        <img src={preIP + this.state.imgUrl} alt="" />
                    </div>
                    <div>
                        <Button variant="contained" size="large" type={this.state.type} color="primary" className={classes.button} onClick={this.addUser.bind(this)}>
                            注册
                     </Button>
                    </div>
                </div>
            </form>
        );
    }
    goBack() {
        window.history.back()
    }
    upDocment(e) {
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('inputFile', file, file.name);//通过append向form对象添加数据
        param.append('chunk', '0');//添加form表单中其他数据
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };  //添加请求头
        axios.post(preIP + '/music/upHead', param, config)
            .then(response => {
                this.setState({
                    imgUrl: response.data
                })
            })
    }
    addUser() {
        let obj = this.state.checkReg;
        for (let i in obj) {
            if (obj[i] === false) {
                return this.setState({
                    type: ''
                })
            }
        }
        return this.setState({
            type: 'submit'
        })
    }

}

InputAdornments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);


