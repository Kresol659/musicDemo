import React, { Component } from 'react';
import { connect } from "react-redux";
import './css/main.css';
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import axios from 'axios';
import Tabs from './tabs.js'
//IP
import { preIP, localIP } from './IP.js'



class Find extends Component {
    constructor(p) {
        super(p);
        this.state = {
            list: [],
            kk: '',
        }
    }
    render() {
        return (
            <div>
                <div className="banner">
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide"><img src={preIP + '/images/banner1.jpg'} alt="" /></div>
                            <div className="swiper-slide"><img src={preIP + '/images/banner2.jpg'} alt="" /></div>
                            <div className="swiper-slide"><img src={preIP + '/images/banner3.jpg'} alt="" /></div>
                            <div className="swiper-slide"><img src={preIP + '/images/banner4.jpg'} alt="" /></div>
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-scrollbar"></div>
                    </div>
                    <div>
                        <div className="music_list_head">
                            <span className="shu"></span>
                            <span className="music_list_text">歌单</span>
                        </div>
                        <div className="song_sheet">
                            {
                                this.state.list.map(o => {
                                    return (<div className="imgshow" key={o._id} onClick={this.toShowMain.bind(this, o._id)}>
                                        <img src={preIP + o.musicImg} alt="" />
                                        <p className="showtitle">{o.title}</p>
                                        <p className="showUname">{o.uname}</p>
                                    </div>)
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    toShowMain(id) {
        window.location.href = localIP + '/#/songMenu/' + id;
    }
    componentWillMount() {
        axios.post(preIP + '/music/getList', {}).then((msg) => {
            this.setState({
                list: msg.data,
            })
        })
    }
    componentDidMount() {
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: false,
            },
            paginationClickable: true,
            speed: 500,
            loop: true,
            observer: true,
            observeParents: true,
            autoplayDisableOnInteraction: false,
            autoplay: true,
            spaceBetween: 10,
            effect: 'coverflow',
            slidesPerView: 3,
            centeredSlides: true,
            coverflow: {
                rotate: 30,
                stretch: 10,
                depth: 60,
                modifier: 2,
                slideShadows: true
            }

        })
    }

}
function filter(state) {
    return { changeNum: state.changeNum }
}
export default connect(filter)(Find);
