import React from 'react';
import { Tag, Input, Tooltip, Button, message } from 'antd';

var axios = require('axios');
var Base = require('../../baseConst.js');
var token = window.localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;
class ModuleList extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
      }
  }
  componentDidMount () {
    this.getCategory();
  }
  getCategory() {
    var _this = this;
    axios.post( Base.API + 'category').then( result => {
      if (result.status == 200) {
        var tags = [];
        var d = result.data.data;
        d.map(function(v,i){
          tags.push(v)
        });

        _this.setState((prevState, props) => {
          return {tags: tags};
        });

      }
    }).catch(err => {
      console.log(err)
    })
  }
  handleClose (categoryId){
    axios.post(Base.API + 'category/offline', {categoryId})
      .then(result => {
        if (result.status == 200 && result.data.ok == 1 && result.data.nModified == 1) {
            message.success("下线成功！！")
            this.getCategory();
        }else{
            message.error("下线失败！！")
        }
      })
      .catch( err => {
        console.log(err)
      })
    
  }

  showInput () {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange (e) {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm () {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      axios.post(Base.API + 'category/create',{categoryName: inputValue})
        .then(result => {
        if (result.status == 200 && result.data.categoryId > 11) {
          message.success("新增成功！！")
          this.getCategory();
        } else {
          message.error(result.data.msg)
        }
        tags = [...tags, inputValue];
      })
      .catch( err => {
        console.log(err)
      });
    }
    
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef(input) {
    this.input = input
  }

  goOnline (categoryId) {
    axios.post(Base.API + 'category/online',{categoryId:categoryId})
      .then( result => {
        if (result.status == 200 && result.data.ok == 1 && result.data.nModified == 1) {
          message.success("上线成功！！")
          this.getCategory();
        } else {
          message.error("上线失败！！")
        }
      })
      .catch( err => {
        console.log(err)
      })
  }
  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        <h4 style={{marginBottom:16}}>上线中:</h4>
        {tags.map((tag, index) => {
          if (!tag.isDelete) {
            const isLongTag = tag.name.length > 20;
            const tagElem = (
              <Tag key={tag._id} color='#2db7f5' closable={index !== 0} afterClose={() => this.handleClose(tag._id)}>
                {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag.name}>{tagElem}</Tooltip> : tagElem;
          }
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef.bind(this)}
            type="text" size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange.bind(this)}
            onBlur={this.handleInputConfirm.bind(this)}
            onPressEnter={this.handleInputConfirm.bind(this)}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput.bind(this)}>+ New Tag</Button>}

        <h4 style={{marginBottom:16,marginTop:16}}>下线中:</h4>
        <div>
          {tags.map((tag, index) => {
          if (tag.isDelete) {
            const isLongTag = tag.name.length > 20;
            const tagElem = (
              <Tag key={tag._id} color='#f50' onClick = {() => this.goOnline(tag._id)}>
                {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag.name}>{tagElem}</Tooltip> : tagElem;
          }
        })}
        </div>
      </div>
    );
  }
}

export default ModuleList;