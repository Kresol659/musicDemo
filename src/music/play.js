import React, { Component } from 'react';
import { connect } from "react-redux";
import './css/main.css';
import axios from 'axios';
import Button from './button.js';
import PlayButton from './playButton.js'
import { recentMusic, nowMusic } from '../store/action.js'
//IP
import { preIP, localIP } from './IP.js'


class Play extends Component {
    constructor(p) {
        super(p);
        this.state = {
            classes: '',
            musicList: [],
            index: 0
        }
    }
    render() {
        return (
            <div className="play_main">
                <div className="head_play">
                    <Button history={this.props.history} />
                    <div className="list_title">
                        <p>{this.state.musicList[this.state.index].name}</p>
                        <p className="singger">{this.state.musicList[this.state.index].singger}</p>
                    </div>
                </div>
                <div className="play_img">
                    <img src={preIP + this.state.musicList[this.state.index].cover} alt="" className={this.state.classes} id="animations" />
                </div>
                <div>
                    <PlayButton src={this.state.musicList[this.state.index].src} imgRotate={this.imgRotate.bind(this)} changeMusic={this.changeMusic.bind(this)} />
                </div>
            </div>
        )
    }
    componentWillMount() {
        console.log(this.props.showRecentMusic)
        this.setState({
            musicList: this.props.showMyMusic.musics,
            index: this.props.showMyMusic.index
        })
    }
    imgRotate(num) {
        if (num === '1') {
            this.setState({
                classes: "Rotation running"
            })
        } else {
            this.setState({
                classes: "Rotation pause"
            })
        }

    }
    changeMusic(val) {
        //上一曲
        if (val === '1') {
            if (this.state.index - 1 < 0) {
                val = this.state.musicList.length - 1
            } else {
                val = this.state.index - 1;
            }
            this.props.dispatch(recentMusic(this.state.musicList[this.state.index]))
            this.setState({
                index: val
            })
        }
        //下一曲 ||循环播放
        else if (val === '2' || val === 'loop') {
            if (this.state.index + 1 >= this.state.musicList.length) {
                val = 0;
            } else {
                val = this.state.index + 1;
            }
            this.props.dispatch(recentMusic(this.state.musicList[this.state.index]))
            this.setState({
                index: val
            })
        }
        //单曲循环
        else if (val === 'single') {
            this.props.dispatch(recentMusic(this.state.musicList[this.state.index]))
            this.setState({
                index: this.state.index - 1 + 1
            })
        }
        //随机播放
        else if (val === 'random') {
            this.props.dispatch(recentMusic(this.state.musicList[this.state.index]))
            this.setState({
                index: Math.floor(Math.random() * this.state.musicList.length)
            })
        }
    }
}
function filter(state) {
    return { changeNum: state.changeNum, showMyMusic: state.showMyMusic, showRecentMusic: state.showRecentMusic }
}
export default connect(filter)(Play);
