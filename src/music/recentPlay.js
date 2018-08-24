import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
import MySplit from './mySplit.js'
import { myMusic, localMusic, recentMusic } from '../store/action'
import Playlittle from './playlittle.js';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
//IP
import { preIP } from './IP.js'
import axios from 'axios';

class RcentPlay extends Component {
    constructor(p) {
        super(p);
        this.state = {
            music: [],
            hidden: {
                display: 'none'
            },
            hidden2: {
                display: 'block'
            }
        }
    }
    render() {
        let num = 0;
        return (
            <div>
                <div className="my_head">
                    <IconButton onClick={this.goBack} style={{ height: '2rem' }}>
                        <ArrowBackIos style={{ fontSize: '1.2rem', color: 'rgb(202, 198, 198)' }} />
                    </IconButton>
                    <span style={{ fontSize: '.9rem', color: 'rgb(202, 198, 198)', verticalAlign: '-.1rem' }}>最近播放</span>
                </div>
                <div style={this.state.hidden2}>
                    {this.state.music.map((o, index) => {

                        return (
                            <div className="music_show" key={o._id + 1} id={o._id} onClick={this.goPlay.bind(this, o, this.state.music, index)} onTouchStart={this.changeBackColor.bind(this, o._id)} onTouchEnd={this.changeBackColorHidden.bind(this, o._id)}>
                                <p className="xu">{++num}</p>
                                <div className="music_info">
                                    <p>{o.name}</p>
                                    <p>{o.singger}</p>
                                </div>
                                <div className="show_more">
                                    <Playlittle />
                                    <p>· · ·</p>
                                </div>
                            </div>
                        )
                    })}
                </div >
                <div style={this.state.hidden}>
                    <p style={{ fontSize: '1.6rem', width: '16rem', margin: '10rem auto', color: '#ef6694', textAlign: 'center' }}>没有找到数据哦😭</p>
                </div>
            </div>
        );

    }
    componentWillMount() {
        if (this.props.showRecentMusic.length > 0) {
            this.setState({
                music: this.props.showRecentMusic,
                hidden: {
                    display: 'none'
                },
                hidden2: {
                    display: 'block'
                }
            })
        } else {
            this.setState({
                music: [],
                hidden: {
                    display: 'block'
                },
                hidden2: {
                    display: 'none'
                }
            })
        }
        console.log(this.props.showRecentMusic)
    }
    goPlay(nowMusic, list, index) {
        this.props.dispatch(myMusic({ musics: list, index }))
        this.props.dispatch(recentMusic(nowMusic))
        this.props.history.push({
            pathname: '/play',
        });
    }
    changeBackColor(id) {
        document.getElementById(`${id}`).className = 'music_showS'
    }
    changeBackColorHidden(id) {
        document.getElementById(`${id}`).className = 'music_show'
    }
    goBack() {
        window.history.back();
    }

}
function filter(state) {
    return { getSession: state.getSession, showMyMusic: state.showMyMusic, showRecentMusic: state.showRecentMusic }
}
export default connect(filter)(RcentPlay);
