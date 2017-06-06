import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Modal, Form, Input, Radio, Select} from 'antd';

var axios = require('axios');
var moment = require('moment')
var Base = require('../../baseConst.js');
var token = window.localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;
const FormItem = Form.Item;
const Option = Select.Option;

const UserEditForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title = '修改用户信息'
                okText='确认'
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout='vertical'>
                    <FormItem label='姓名'>
                    { getFieldDecorator('name', {
                        rules: [{ required: true, message: '请填写用户名'}],
                        initialValue: props.infos.name
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label='年龄'>
                    { getFieldDecorator('age', {
                        rules: [{ required: true, message: '请填写年龄'}],
                        initialValue: props.infos.age
                    })(
                        <Input />
                    )}
                    </FormItem>
                    <FormItem label='性别'>
                    { getFieldDecorator('gender', {
                        rules: [{ required: true, message: '请填写性别'}],
                        initialValue: props.infos.gender
                    })(
                        <Select placeholder='请选择性别'>
                            <Option value='m'>男</Option>
                            <Option value='f'>女</Option>
                            <Option value='x'>保密</Option>
                        </Select>
                    )}
                    </FormItem>
                    <FormItem label='邮箱'>
                    { getFieldDecorator('email', {
                        rules: [{ required: true, message: '请填写邮箱'}],
                        initialValue: props.infos.email
                    })(
                        <Input />
                    )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
);

class UserEdit extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            infos: {
                name:'',
                age:'',
                gender:'',
                email:''
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.infos) {
            return;
        }
        this.setState({
            visible: nextProps.showPop,
            infos: nextProps.infos
        });
    }
    showModal () {
        this.setState({
            visible: true
        })
    }

    handleCancel () {
        this.setState({
            visible: false
        })
    }

    handleCreate () {
        const form = this.form;
        form.validateFields( (err, values) => {
            if (err) {
                return;
            }
            var json = {};
            json.id = this.state.infos.id;
            json.data = values;
            axios.post(Base.API + 'user/edit',json)
                .then( result => {
                    if (result.status === 200 && result.data.ok === 1) {
                        this.props.getUser();
                    }
                })
                .catch ( err => {
                    console.log(err)
                })
            form.resetFields();
            this.setState({visible: false})
        })
    }
    saveFormRef (form) {
        this.form = form;
    }
    render () {
        return (
            <div>
                <UserEditForm 
                    ref = {this.saveFormRef.bind(this)}
                    visible={this.state.visible}
                    infos = {this.state.infos}
                    onCancel={this.handleCancel.bind(this)}
                    onCreate={this.handleCreate.bind(this)}
                />
            </div>
        );
    }
}

export default UserEdit;