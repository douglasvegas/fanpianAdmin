import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Sider } = Layout;

const logoStyle = {
    width: '120px',
    height: '31px',
    background: '#333',
    borderRadius: '6px',
    margin: '16px 28px 16px 0',
    float:'left',
    textAlign:'center',
    lineHeight:'31px',
    color: '#fff',
    fontWeight:'bolder'
}

class Head extends React.Component {
    constructor (props) {
        super (props);
        this.state = {

        }
    }
    handleClick ({item,key,keyPath}) {
        window.localStorage.removeItem('token');
        window.location.href = window.location.origin;
    }
    render () {
        return (
            <Header className="header">
                <div className='logo' style = {logoStyle}>RecordAdmin</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px',float:'right' }}
                    onClick = {this.handleClick.bind(this)}
                >
                    <SubMenu title={<span><Icon type='user' />管理员</span>}
                    >
                        <MenuItemGroup>
                            <Menu.Item key = 'logout'>
                                退出
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default Head;
