import React from 'react';
import { Menu,Switch,Icon } from 'antd';

const { SubMenu } = Menu;

import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class SideNav extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          theme: 'light',
          current: 'guest',
          defaultOpenKeys: ['sub1','sub2','sub4'],
          currentKey:''
      }
    }  
    changeTheme(value) {
        this.setState({
        theme: value ? 'dark' : 'light',
        });
    }
    handleClick(e){
        const BreadArray = e.item.props.BreadArray
        this.props.handleBreadArray(BreadArray);
        this.setState({
            current: e.key,
        });
    }
    updateActive () {
        //页面刷新根据路由重新定位侧边栏的active
        var _path = window.location.href;
        var current = _path.substr(_path.lastIndexOf('/') + 1);
        var currentKey = this.getSubKey(current);

        this.setState({
            current:current,
            currentKey:currentKey
        })
    }
    componentDidMount() {
        this.updateActive();
    }
    getSubKey (current) {
        var currentKey;
        var keyMaps = { 
            'sub1': ['guest','users','articles'],
            'sub2': ['userList'],
            'sub4': ['articleList','moduleList']
        }
        for (var key in keyMaps) {
            if (keyMaps[key].indexOf(current) != -1) {
                currentKey = key;
            }
        }
        return currentKey;
    }
    openChange (v) {
        this.setState({
            currentKey: v[v.length - 1]
        })
    }
    render () {
        return (
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick.bind(this)}
                    style={{  height: '100%' }}
                    openKeys={[this.state.currentKey]}
                    selectedKeys={[this.state.current]}
                    onOpenChange={this.openChange.bind(this)}
                    mode="inline"
                    multiple={true}
                >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>面板</span></span>}>
                    <Menu.Item key="guest" BreadArray="面板,访客统计"><Link to='/app/panel/guest'>访客统计</Link></Menu.Item>
                    <Menu.Item key="users" BreadArray="面板,用户统计"><Link to='/app/panel/users'>用户统计</Link></Menu.Item>
                    <Menu.Item key="articles" BreadArray="面板,文章统计"><Link to='/app/panel/articles'>文章统计</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>用户管理</span></span>}>
                    <Menu.Item key="userList" BreadArray="用户管理,用户列表"><Link to='/app/userManage/userList'>用户列表</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>文章管理</span></span>}>
                    <Menu.Item key="articleList" BreadArray="文章管理,文章列表"><Link to='/app/articleManage/articleList'>文章列表</Link></Menu.Item>
                    <Menu.Item key="moduleList" BreadArray="文章管理,模块管理"><Link to='/app/articleManage/moduleList'>文章模块</Link></Menu.Item>
                </SubMenu>
                <Switch
                    checked={this.state.theme === 'dark'}
                    onChange={this.changeTheme.bind(this)}
                    checkedChildren="暗黑"
                    unCheckedChildren="亮白"
                    />
                </Menu>
        )
    }
}

export default SideNav;