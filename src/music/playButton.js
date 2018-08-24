import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import SkipNext from '@material-ui/icons/SkipNext';
import SkipPrevious from '@material-ui/icons/SkipPrevious';
import Repeat from '@material-ui/icons/Repeat';
import QueueMusic from '@material-ui/icons/QueueMusic';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import RepeatOne from '@material-ui/icons/RepeatOne';
import Shuffle from '@material-ui/icons/Shuffle';
//IP
import { preIP, localIP } from './IP.js'
import { parse } from 'url';
const styles = {
    root: {
        flexGrow: 1,
        width: '17rem',
        margin: '2rem auto 1rem auto'
    },
};

class LinearDeterminate extends React.Component {
    constructor(p) {
        super(p);
        this.state = {
            src: '',
            playauto: 'autoPlay',
            completed: 0,
            timer: null,
            autoPlay: 'autoPlay',
            time: '',
            timer2: null,
            goTime: 0,
            nowTime: 0,
            changeTime: '00:00',
            playBtn: {
                fontSize: '5rem',
                color: '#33ab9f'
            },
            pauseBtn: {
                display: 'none'
            },
            playPattern1: {
                fontSize: '2rem', color: '#33ab9f', marginRight: '2rem'
            },
            playPattern2: {
                display: 'none'
            },
            playPattern3: {
                display: 'none'
            },
            ifrand: 'loop'

        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.timer2);
    }

    progress = () => {
        const { completed, goTime, nowTime } = this.state;
        if (completed === 100) {
            if (this.state.ifrand === "loop") {
                this.changeMusic("loop")
            } else if (this.state.ifrand === "single") {
                this.changeMusic("single")
            } else if (this.state.ifrand === "random") {
                this.changeMusic("random")
            }
            this.setState({
                completed: 0
            });
        } else {
            this.setState({
                completed: Math.min(nowTime / (goTime / 100), 100)
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '-2.8rem', fontSize: '.9rem', top: '-.4rem', color: '#ccc4c4' }}>{this.state.changeTime}</span>
                    <LinearProgress variant="determinate" value={this.state.completed} />
                    <span style={{ position: 'absolute', right: '-2.8rem', fontSize: '.9rem', top: '-.4rem', color: '#ccc4c4' }}>{this.state.time}</span>
                </div>
                <audio id="audioPlay" src={preIP + this.props.src} autoPlay={this.state.autoPlay} ref="playMusic" onLoadedData={this.playLoad.bind(this)} ></audio>
                <IconButton aria-label="docment" style={{ margin: '1rem 0 0 7rem' }}>
                    <Repeat style={this.state.playPattern1} onClick={this.changePattern.bind(this, 'single')} />
                    <RepeatOne style={this.state.playPattern2} onClick={this.changePattern.bind(this, 'random')} />
                    <Shuffle style={this.state.playPattern3} onClick={this.changePattern.bind(this, 'loop')} />
                    <SkipPrevious style={{ fontSize: '3rem', color: '#33ab9f', marginRight: '1rem' }} onClick={this.changeMusic.bind(this, '1')} />
                    <PlayCircleFilled onClick={this.playMusic.bind(this, '1')} style={this.state.playBtn} />
                    <PauseCircleFilled onClick={this.playMusic.bind(this, '2')} style={this.state.pauseBtn} />
                    <SkipNext style={{ fontSize: '3rem', color: '#33ab9f', marginLeft: '1rem' }} onClick={this.changeMusic.bind(this, '2')} />
                    <QueueMusic style={{ fontSize: '2rem', color: '#33ab9f', marginLeft: '2rem' }} />
                </IconButton>

            </div>
        );
    }
    componentWillMount() {
        this.props.imgRotate('1');
    }
    playLoad() {
        let audioPlay = document.getElementById('audioPlay');
        let currentTime;
        this.state.timer2 = setInterval(() => {
            currentTime = audioPlay.currentTime;
            let timeGo = parseInt(currentTime);
            if (timeGo < 10) {
                timeGo = '00:0' + timeGo;
            } else if (timeGo > 60) {
                let t1 = parseInt(timeGo / 60);
                let t2 = timeGo % 60;
                timeGo = `${t1 < 10 ? '0' + t1 : t1}:${t2 < 10 ? '0' + t2 : t2}`
            } else {
                timeGo = '00:' + timeGo;
            }
            this.setState({
                nowTime: currentTime,
                changeTime: timeGo
            })

        }, 100)
        let totalTime = audioPlay.duration;
        let pre = parseInt(totalTime / 60)
        let next = parseInt(totalTime % 60)
        pre < 10 ? pre = '0' + pre : pre;
        next < 10 ? pre = '0' + pre : pre;
        this.setState({
            time: `${pre}:${next}`,
            goTime: parseInt(audioPlay.duration),

        })

    }
    playMusic(num) {
        let audioPlay = document.getElementById('audioPlay');
        if (num === '1') {
            audioPlay.play();
            this.props.imgRotate('1');
            this.setState({
                playBtn: {
                    display: 'none'

                },
                pauseBtn: {
                    fontSize: '5rem',
                    color: '#33ab9f',
                    display: 'inline-block'
                },
            })
        } else if (num === '2') {
            audioPlay.pause();
            this.props.imgRotate('2');
            this.setState({
                playBtn: {
                    fontSize: '5rem',
                    color: '#33ab9f',
                    display: 'inline-block'
                },
                pauseBtn: {
                    display: 'none'


                },
            })
        }

    }
    componentDidMount() {
        this.state.timer = setInterval(this.progress, 100);
        this.playMusic('1');
    }
    changeMusic(num) {
        this.setState({
            playBtn: {
                display: 'none'
            },
            pauseBtn: {
                fontSize: '5rem',
                color: '#33ab9f',
                display: 'inline-block'



            },
        })
        this.props.changeMusic(num)
    }
    changePattern(val) {
        //循环播放
        if (val === 'loop') {
            this.setState({
                ifrand: val,
                playPattern1: {
                    display: 'none'
                },
                playPattern2: {
                    fontSize: '2rem', color: '#33ab9f', marginRight: '2rem'
                },
                playPattern3: {
                    display: 'none'
                },
            })
            //单曲循环播放
        } else if (val === 'single') {
            this.setState({
                ifrand: val,
                playPattern1: {
                    display: 'none'
                },
                playPattern2: {
                    display: 'none'

                },
                playPattern3: {
                    fontSize: '2rem', color: '#33ab9f', marginRight: '2rem'
                },
            })
            //随机播放
        } else if (val === 'random') {
            this.setState({
                ifrand: val,
                playPattern1: {
                    fontSize: '2rem', color: '#33ab9f', marginRight: '2rem'
                },
                playPattern2: {
                    display: 'none'

                },
                playPattern3: {
                    display: 'none'
                },
            })
        }

    }
}

LinearDeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);