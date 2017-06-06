import React from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
const { Content,Sider,Footer } = Layout;
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Home from './Home.jsx';
import Head from './Head.jsx';
import BreadcrumbCustom from './BreadcrumbCustom.jsx';
import SideNav from './SideNav.jsx';
var axios = require('axios');
var Base = require('../baseConst.js')
import routes from '../route/routes.js';

import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class AppContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            BreadArray:['首页'],
      }
      this.handleBreadArray = this.handleBreadArray.bind(this);
    }  
    handleBreadArray (data) {
        this.setState({
            BreadArray: data.split(",")
        })
    }
    componentDidMount() {
        var func = this.props.func;

        var token = window.localStorage.getItem('token');
        if (!token) {
            func(false);
            return;
        }
        var instance = axios.create({
            baseURL: Base.API,
            timeout: 1000,
            headers:{'x-access-token': token}
        });

        instance.post('signin/auth').then(result => {
            if (result.status == 200 && result.data.code == 200) {
                func(true);
            } else {
                func(false);
            }
        }).catch (err => {
            func(false);
        }) 
    }
    render () {
        return (
            <Layout>
                <Head></Head>
                <Layout style = {{minHeight:'850px'}}>
                    <Sider  width={200} style={{ background: '#fff' }}>
                        <SideNav handleBreadArray = {this.handleBreadArray}/>
                    </Sider>
                    <Content  style={{ margin: '0 16px' }}>
                        <BreadcrumbCustom BreadArray = {this.state.BreadArray} />
                        <Layout style={{minHeight: '780px'}}>
                            <Content style={{ background: '#fff', padding: 24, margin: 0}}>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.content}
                                    />
                                ))}
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center',color: '#ecf6fd',background: '#333'}}>
                    Record-Admin ©2017 Created by douglas
                </Footer>
            </Layout>
        )
    }
}

export default AppContainer;