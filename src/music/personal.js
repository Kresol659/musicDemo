import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
import ChangeHead from './changeHead.js'
import { saveSession } from '../store/action.js'
//IP
import { preIP, localIP } from './IP.js'
import PersonalInfo from './personInfo.js'
class Personal extends Component {
    constructor(p) {
        super(p);
        this.state = {
            show: preIP + '/userhead/default.png',
            login: {
                display: 'block'
            }
        }
    }
    render() {
        return (
            <div style={{ height: '100%', backgroundColor: '#fff' }}>

                <div className="my_bg">
                    <div className="person_head">
                        <ChangeHead src={this.state.show} thisid={this.props.getSession.id} changeUserHeaed={this.changeUserHeaed.bind(this)} />
                    </div>
                    <div>
                        <p className="person_login" style={this.state.login} onClick={this.toLogin.bind(this)}>登录</p>
                        <p className="person_name">{this.props.getSession.uname}</p>
                        <p className="person_email">{this.props.getSession.email}</p>
                    </div>
                </div>
                <div style={{ height: '60rem', backgroundColor: '#fff' }}>
                    <PersonalInfo info={this.props.getSession} />
                </div>
            </div >
        );

    }
    changeUserHeaed(val) {
        let sessionX = this.props.getSession;
        sessionX.uhead = val;
        this.props.dispatch(saveSession(sessionX))
        this.setState({
            show:preIP+val
        })
    }
    goBack() {
        this.props.history.back();
    }
    componentWillMount() {
        if (this.props.getSession) {
            this.setState({
                show: preIP + this.props.getSession.uhead,
                login: {
                    display: 'none'
                }
            })
        } else {
            this.setState({
                show: preIP + '/userhead/default.png',
                login: {
                    display: 'block'
                }
            })
        }
    }
    toLogin() {
        window.location.href = localIP + '/#/login';
    }


}
function filter(state) {
    return { getSession: state.getSession }
}
export default connect(filter)(Personal);
