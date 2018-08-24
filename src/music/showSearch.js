import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Search from '@material-ui/icons/Search';
import Playlittle from './playlittle';
import { myMusic } from '../store/action';
//IP
import { preIP } from './IP.js'
import axios from 'axios';

class showSearch extends Component {
    constructor(p) {
        super(p);
        this.state = {
            music: [],
            qian: {
                opacity: '1'
            },
            showSearch: [],
            hidden: {
                display: 'block'
            },
            hotStyle: {
                display: 'block'
            },
            words: ['无人之岛', '七里香', '新乐音符', '一千年以后', '我怎么这么好看', '一百万个可能', '雪落的声音'],
            searchNull: {
                display: 'none'
            }
        }
    }
    render() {
        let num = 0;
        return (
            <div>
                <div className="my_head">
                    <IconButton onClick={this.goBack.bind(this)}>
                        <ArrowBackIos style={{ fontSize: '2rem', color: '#b2dfdb', margin: '.1rem 0 0 1rem' }} />
                    </IconButton>
                    <input type="text" placeholder="输入歌曲名..........." style={{ padding: '.4rem 2rem', width: '13rem', borderRadius: '1rem', border: '.08rem solid #4aedc4', outline: 'none' }} onChange={this.refSearch.bind(this)} ref="search" />
                    <IconButton style={{ position: 'absolute', right: '1rem', top: '-.05rem' }} onClick={this.goSearch.bind(this)}>
                        <Search className="search_icon" style={{ fontSize: '2rem' }} />
                    </IconButton>
                    <div className="search_show" style={this.state.hidden}>
                        {this.state.showSearch.map(o => <p key={'3' + this.randomKey()} className="refMusicStyle" onClick={this.refInSearch.bind(this)}>{o.name}</p>)}
                    </div>
                </div>
                <div style={this.state.hotStyle}>
                    <p className="hot_title">热门搜索</p>
                    <div className="hot_main">
                        {
                            this.state.words.map(o => <p key={'2' + this.randomKey()} onClick={this.toSearch.bind(this)} style={{ border: `.1rem solid rgb(${this.colorRandom()},${this.colorRandom()},${this.colorRandom()})`, color: `rgb(${this.colorRandom()},${this.colorRandom()},${this.colorRandom()})`, padding: '.5rem 1rem', margin: '1rem  .5rem', boxShadow: '.1rem .4rem .8rem #4aedc4', borderRadius: '.5rem' }}>{o}</p>)
                        }
                    </div>
                </div>
                <div>
                    {
                        this.state.music.map((o, index) => {
                            return (
                                <div className="music_show" key={'1' + this.randomKey()} onClick={this.goPlay.bind(this, this.state.music, index)}>
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
                        })
                    }
                </div>
                <div style={this.state.searchNull}>
                    <p style={{ fontSize: '1.6rem', width: '16rem', margin: '10rem auto', color: '#ef6694', textAlign: 'center' }}>没有找到数据哦😭</p>
                </div>
            </div >
        );

    }
    goBack() {
        window.history.back()
    }
    refSearch(e) {
        if (e.target.value !== '') {
            axios.post(preIP + '/music/getMusic', { name: e.target.value }).then((msg) => {
                this.setState({
                    showSearch: msg.data,
                    hidden: {
                        display: 'block'
                    }
                })
            })
        } else {
            this.setState({
                hidden: {
                    display: 'none'
                }
            })
        }
    }
    goSearch() {
        axios.post(preIP + '/music/getMusic', { name: this.refs.search.value }).then((msg) => {
            console.log(msg.data)
            if (msg.data.length !== 0) {
                this.setState({
                    music: msg.data,
                    hidden: {
                        display: 'none'
                    },
                    hotStyle: {
                        display: 'none'
                    },
                    searchNull: {
                        display: 'none'
                    }
                })
            } else {
                this.setState({
                    hidden: {
                        display: 'none'
                    },
                    hotStyle: {
                        display: 'none'
                    },
                    searchNull: {
                        display: 'block'
                    }
                })

            }
        })
    }
    toSearch(e) {
        this.refs.search.value = e.target.innerText;
        this.goSearch();
    }
    goPlay(list, index) {
        this.props.dispatch(myMusic({ musics: list, index }))
        this.props.history.push({
            pathname: '/play',
        });
    }
    colorRandom() {
        return Math.floor(Math.random() * 256)
    }
    refInSearch(e) {
        this.refs.search.value = e.target.innerText;
        this.goSearch();
    }
    randomKey() {
        return Math.random() * 9999999
    }



}
function filter(state) {
    return { getSession: state.getSession, showMyMusic: state.showMyMusic }
}
export default connect(filter)(showSearch);
