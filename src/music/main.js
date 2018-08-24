import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import './css/main.css';
//IP
import { preIP } from './IP.js'
//ui组件
import Search from './search.js';
import Navigation from './navigation.js'
import SideMenu from './sideMenu.js'
import Personal from './personal.js'
import MyMusic from './myMusic.js'
import RecentPlay from './recentPlay.js'
// import axios from 'axios';
import { saveSession } from '../store/action.js';
import Tabs from './tabs';
class App extends Component {
    constructor(p) {
        super(p);
    }
    render() {
        return (
            <div ref="close">
                <div className="main_style">
                    <div>
                        <div>
                            <SideMenu getData={this.getData.bind(this)} />
                        </div>
                    </div>
                    <div>
                        <Search></Search>
                    </div>
                    <div>
                        <img src={preIP + '/images/outline_add_white_18dp.png'} alt="" className="extend" />
                    </div>
                </div>
                <div className="main_content">
                    <Router>
                        <div>
                            <Route path="/main/index" component={Tabs} />
                            <Route path="/main/mymusic" component={MyMusic} />
                            <Route path="/main/personal" component={Personal} />
                            <Route path="/main/recentplay" component={RecentPlay} />
                        </div>
                    </Router>
                </div>
                <div>
                    <Navigation history={this.props.history} ></Navigation>
                </div>
            </div >
        );

    }
    getData(val) {
        this.props.dispatch(saveSession(val))
    }


}
function filter(state) {
    return { getSession: state.getSession }
}
export default connect(filter)(App);
