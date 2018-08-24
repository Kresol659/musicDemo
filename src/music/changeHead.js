import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { connect } from "react-redux";
import { preIP, localIP } from './IP.js'
import axios from 'axios'
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    input: {
        display: 'none'
    },
};

class SimpleDialog extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            imgUrl: ''
        }
    }
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);

        this.setState({
            imgUrl: ''
        })
    };

    handleListItemClick = value => {
        if (this.props.user.thisid) {
            axios.post(preIP + '/music/changeHead', { _id: this.props.user.thisid, uhead: this.state.imgUrl }).then(() => {
                this.props.user.changeUserHeaed(this.state.imgUrl);
                this.props.onClose(value);
            })
        }


    };


    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose.bind(this)} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">更换头像</DialogTitle>
                <div>
                    <List>
                        <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="upfile"
                                    multiple
                                    type="file"
                                    name="inputFile"
                                    onChange={this.changeHead.bind(this)}
                                />

                                <label htmlFor="upfile">
                                    <Button variant="contained" component="span" >
                                        选择图片
                                    </Button>
                                </label>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <img src={preIP + this.state.imgUrl} alt="" />
                        </ListItem>
                        <ListItem style={{ display: 'flex', flexFlow: 'row-reverse nowrap', padding: '0' }}>
                            <Button onClick={this.handleListItemClick.bind(this, 'account')} variant="contained" style={{ marginRight: '1rem', minWidth: '2rem', minHeight: '1.2rem', fontSize: '.6rem', padding: '.2rem .5rem' }}>
                                确定
                             </Button>
                            <Button onClick={this.handleClose.bind(this)} variant="contained" style={{ marginRight: '1.2rem', fontSize: '.6rem', minWidth: '2rem', minHeight: '1.2rem', padding: '.2rem .5rem' }}>
                                取消
                        </Button>
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        );
    }
    changeHead(e) {
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
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            open: false,
        }
    }
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}><img src={this.props.src} alt="" /></Button>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                    user={this.props}
                />
            </div>
        );
    }
}
function filter(state) {
    console.log(state)
    return {}
}
export default connect(filter)(SimpleDialogDemo);