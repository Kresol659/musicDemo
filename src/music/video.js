import React, { Component } from 'react';
import { connect } from "react-redux";
import './css/main.css';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios';
import Tabs from './tabs.js'
//IP
import { preIP, localIP } from './IP.js'



class Video extends Component {
    constructor(p) {
        super(p);
        this.state = {
            video: [{ name: '', src: '', singger: '' }],
        }
    }
    render() {
        return (
            <div style={{ height: '31rem', overflow: 'auto' }}>
                {
                    this.state.video.map(o => {
                        return (
                            <div key={o._id + '1'} style={{ background: 'linear-gradient(45deg,#16222A,#3A6073) ', marginBottom: '1.1rem', boxShadow: '.1rem .2rem 1rem black', borderRadius: '.5rem' }}>
                                <video src={preIP + o.src} style={{ width: '100%', borderTopRightRadius: '.5rem', borderTopLeftRadius: '.5rem' }} controls></video>
                                <p style={{ padding: '.5rem .5rem 0 .5rem', fontSize: '1rem', color: '#cecece' }}>{o.name}</p>
                                <p style={{ padding: '0 .5rem .25rem .5rem', fontSize: '.8rem', color: '#cecece' }}>{o.singger}</p>
                            </div>
                        )
                    })
                }

            </div>
        )
    }
    componentDidMount() {
        axios.post(preIP + '/music/getVideo', {}).then((msg) => {
            this.setState({
                video: msg.data
            })
        })
    }

}
function filter(state) {
    return { changeNum: state.changeNum }
}
export default connect(filter)(Video);
