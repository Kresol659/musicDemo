import React, { Component } from 'react';
import { connect } from "react-redux";
import './css/main.css';
import axios from 'axios';
import Button from './button.js';
import MusicIcon from './musicIcon.js';
import Playlittle from './playlittle.js';
import { myMusic,recentMusic } from '../store/action'
//IP
import { preIP, localIP } from './IP.js'

class songMenu extends Component {
    constructor(p) {
        super(p);
        this.state = {
            uname: '',
            uhead: '',
            title: '',
            musicImg: '',
            music: [],
            color: {}
        }
    }
    render() {
        let num = 0;
        return (
            <div>
                <div className="head_style">
                    <Button history={this.props.history} />
                    <span className="list_title">
                        歌单
                        </span>
                </div>
                <div className="top_Style">
                    <div className="img_main">
                        <img src={preIP + this.state.musicImg} alt="" />
                    </div>
                    <div>
                        <p className="music_title">{this.state.title}</p>
                        <div className="user_head" >
                            <img src={preIP + this.state.uhead} alt="" />
                            <span>{this.state.uname}</span>
                            <span>&gt;</span>
                        </div>
                    </div>
                </div>
                <div className="extends">
                    <MusicIcon />
                </div>
                <div>
                    {this.state.music.map((o, index) => {

                        return (
                            <div className="music_show" key={o._id + 1} id={o._id} onClick={this.goPlay.bind(this,o,this.state.music, index)} onTouchStart={this.changeBackColor.bind(this, o._id)} onTouchEnd={this.changeBackColorHidden.bind(this, o._id)}>
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
            </div>
        )
    }
    componentWillMount() {
        let path = this.props.history.location.pathname.split('/');
        axios.post(preIP + '/music/getDetails', { _id: path[path.length - 1] }).then((msg) => {
            this.setState({
                music: msg.data.music,
                uname: msg.data.uname,
                musicImg: msg.data.musicImg,
                uhead: msg.data.uhead,
                title: msg.data.title,
            })
        })
        console.log(this.state)
    }
    goPlay(nowMusic,list, index) {
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

}
function filter(state) {
    return { changeNum: state.changeNum, showMyMusic: state.showMyMusic }
}
export default connect(filter)(songMenu);
