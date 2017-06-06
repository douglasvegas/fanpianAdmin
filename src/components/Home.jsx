import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
const FormItem = Form.Item;

var axios = require('axios');
var Base = require('../baseConst.js')
var imgList = [
          '//gold-cdn.xitu.io/v3/static/img/normal.0447fe9.png', //normal
          '//gold-cdn.xitu.io/v3/static/img/blindfold.58ce423.png', //blindfold
          '//gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png', //greeting
      ];

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
  handleSubmit(e){
    e.preventDefault();
    var func = this.props.func;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post(Base.API + 'signin/admin', {
            name: values.userName,
            password: values.password
        }).then ( result => {
            if (result.status == 200 && result.data.code == 200 ) {
                var token = result.data.token;
                window.localStorage.setItem('token',token);
                message.success('登录成功！！');
                func(true);
                window.location.href = window.location.href + 'app/panel/guest';
            } else {
                message.error(result.data.message)
            }
        })
      }
    });
  }
  handleFocus (flag) {
    var imgUrl = imgList[flag];
    document.getElementById('showPanda').setAttribute('src',imgUrl);
      
  }
  handleBlur () {
    document.getElementById('showPanda').setAttribute('src',imgList[2]);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} autocomplete="off"  placeholder="用户名" onFocus = {this.handleFocus.bind(this,0)} onBlur = {this.handleBlur.bind(this)} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" autocomplete="off"  placeholder="密码" onFocus = {this.handleFocus.bind(this,1)} onBlur = {this.handleBlur.bind(this)} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const style = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#108ee9',
    backgroundImage:'linear-gradient(127deg, #0f71bd, #1877c1 6%, #3ece86)',
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render () {
        return (
                <div style={style} id='components-form-demo-normal-login'>
                    <div style={{position:'relative',width: '600px',height: '600px',margin: '0 auto',marginTop: '60px',textAlign:'center'}}>
                        <img src="//gold-cdn.xitu.io/v3/static/img/greeting.1415c1c.png" alt="" width='120' height='95' 
                        style={{position: 'relative',top: '25px',display:'inline-block'}}   id='showPanda'/>
                        <WrappedNormalLoginForm func = {this.props.func} />
                    </div>
                </div>
        )
    }
}

export default Home;