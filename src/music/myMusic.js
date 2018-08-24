import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
import MySplit from './mySplit.js'
import { myMusic, localMusic, recentMusic } from '../store/action'
//IP
import { preIP } from './IP.js'
import axios from 'axios';

class MyMusic extends Component {
    constructor(p) {
        super(p);
        this.state = {
            allmusic: []
        }
    }
    render() {
        let num = 0;
        return (
            <div>
                <MySplit allmusic={this.state.allmusic} toLocalMusic={this.toLocalMusic.bind(this)} recentMusic={this.props.showRecentMusic} />
            </div >
        );

    }
    componentWillMount() {
        //所有歌曲
        if (this.props.getSession) {
            axios.post(preIP + '/music/getMyMusic', { _id: this.props.getSession.id }).then((msg) => {
                console.log(msg)
                this.setState({
                    allmusic: msg.data.music,
                })
            })
        }
    }
    toLocalMusic(val) {
        if (val === 'local') {
            this.props.dispatch(localMusic({ allmusic: this.state.allmusic }));
            this.props.history.push('/my')
        }

    }


}
function filter(state) {
    return { getSession: state.getSession, showMyMusic: state.showMyMusic, showRecentMusic: state.showRecentMusic }
}
export default connect(filter)(MyMusic);
