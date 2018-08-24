import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
import Playlittle from './playlittle'
import { myMusic,recentMusic } from '../store/action'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
//IP
import { preIP } from './IP.js'
import axios from 'axios';

class My extends Component {
    constructor(p) {
        super(p);
        this.state = {
            music: [],
            qian: {
                opacity: '1'
            },
            nothing: '没有数据哦(┬＿┬)',
            default: {
                fontSize: '2rem', width: '20rem', margin: '2.5rem auto 0 auto', textAlign: 'center', color: '#33ab9f'
            }
        }
    }
    render() {
        let num = 0;
        return (
            <div>
                <div className="my_head">
                    <IconButton onClick={this.goBack}> 
                        <ArrowBackIos />
                    </IconButton>
                    <span style={{fontSize:'1.2rem',color:'rgb(177, 177, 177)',verticalAlign:'-.1rem'}}>本地音乐</span>
                </div>
                <div style={this.state.default}>
                    {this.state.nothing}
                </div>
                <div>
                    {this.state.music.map((o, index) => {
                        return (
                            <div className="music_show" key={o._id} onClick={this.goPlay.bind(this, this.state.music, index)}>
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
                </div>
            </div >
        );

    }
    componentDidMount() {
        if (this.props.getSession !== '') {
            this.setState({
                music: this.props.showLocalMusic.allmusic,
                nothing: '',
                default: {}
            })
        }
    }
    goPlay(list, index) {
        this.props.dispatch(myMusic({ musics: list, index }))
        this.props.history.push({
            pathname: '/play',
        });
    }
    goBack() {
        window.history.back();
    }

}
function filter(state) {
    return { getSession: state.getSession, showMyMusic: state.showMyMusic, showLocalMusic: state.showLocalMusic ,showRecentMusic:state.showRecentMusic}
}
export default connect(filter)(My);
