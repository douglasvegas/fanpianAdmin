import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
const { Content,Sider,Footer } = Layout;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Home from './Home.jsx';
import Head from './Head.jsx';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import SideNav from './SideNav.jsx';
import AppContainer from './AppContainer.jsx'
import routes from '../route/routes.js';

import {
    HashRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'

class HeaderMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            BreadArray:['首页'],
            noLogged: false
      }
      this.handleBreadArray = this.handleBreadArray.bind(this);
    }  
    handleBreadArray (data) {
        this.setState({
            BreadArray: data.split(",")
        })
    }
    componentDidMount() {

    }
    judgeLogged (flag) {
        this.setState({
            noLogged: !flag
        })
    }
    render() {
        let noLogged = this.state.noLogged;
        return (
            <Router hashType = 'hashbang'>
                <div>
                    <Route path={'/'} exact={true} render = { ()=> (
                        <Home func = {this.judgeLogged.bind(this)} />
                    ) } />
                    <Route path={'/app'}  render = {() => (
                        noLogged ? (
                            <Redirect to='/' />
                        ) : (
                            <AppContainer func = {this.judgeLogged.bind(this)}/>
                        )
                    )} />
                </div>
            </Router>
        )
    }
}

export default HeaderMenu;
