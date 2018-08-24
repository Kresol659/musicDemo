import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store/store.js'


//功能组件
import Main from './music/main.js'
import ToMain from './music/toMain.js'
import Login from './music/login.js'
import Reg from './music/reg.js'
import SongMenu from './music/songMenu.js'
import Play from './music/play.js'
import My from './music/my.js'
import ShowSearch from './music/showSearch.js'



ReactDOM.render(
    <div>
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={ToMain} />
                    <Route path="/main" component={Main} />
                    <Route exaxt path="/login" component={Login} />
                    <Route exaxt path="/reg" component={Reg} />
                    <Route exaxt path="/songMenu" component={SongMenu} />
                    <Route exaxt path="/play" component={Play} />
                    <Route exaxt path="/search" component={ShowSearch} />
                    <Route exaxt path="/my" component={My} />
                </div>
            </Router>
        </Provider>
    </div>, document.getElementById('root'));