import React from 'react';

var axios = require('axios');
var moment = require('moment');
var marked = require('marked');
var Base = require('../../baseConst.js')
var token = window.localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;
import { Input, Button, message } from 'antd';

class EditArticle extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        }
    }
    componentDidMount () {
        var id = this.props.match.params.id;
        var _this = this;
        axios.post(Base.API + 'post/' + id).then( result => {
            if (result.status === 200 && result.data.code === 200) {
                _this.setState({
                    title: result.data.title,
                    content: result.data.content
                })
            } else {
                console.log(result.data.msg)
            }
        })
    }
    handleClick () {
        var id = this.props.match.params.id;
        axios.post(Base.API + 'post/edit/' + id, {
            title: this.state.title,
            content: this.state.content
        }).then( result => {
            if (result.status == 200 && result.data.ok == 1 && result.data.nModified == 1) {
                message.success("修改成功！！")
            } else {
                message.error("修改失败！！")
            }
        })
    }
    changeTitle (e) {
        this.setState({
            title: e.target.value
        })
    }
    changeContent (e) {
        this.setState({
            content: e.target.value
        })
    }
    handlePreview () {
        var pContent = marked(this.state.content);
        document.getElementById('preview').innerHTML = pContent;
        document.getElementById('preview').style.display = 'block'
    }
    render () {
        return (
            <div>
                <Input value = {this.state.title}
                       type = 'text'
                       ref = 'title'
                       onChange = {this.changeTitle.bind(this)}
                />
                <br/>
                <br/>
                <Input value = {this.state.content}
                       type = 'textarea'
                       onChange = {this.changeContent.bind(this)}
                       autosize
                />
                <br/>
                <br/>
                <Button type = 'primary' onClick = { this.handleClick.bind(this) } style={{marginRight:20}}>
                    确认修改
                </Button>

                <Button onClick = { this.handlePreview.bind(this) }>
                    预览
                </Button>
                <br/>
                <br/>
                <div id='preview' style={{display:'none',border:'1px solid #ccc'}}>
                    
                </div>
            </div>
        )
    }
}


export default EditArticle;