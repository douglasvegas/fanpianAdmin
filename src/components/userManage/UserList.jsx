import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Icon, Button, Popconfirm ,Pagination, Spin} from 'antd';
var axios = require('axios');
var moment = require('moment')
var Base = require('../../baseConst.js')
var token = window.localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;
import style from  '../../style/UserList.scss';
import UserEdit from '../forms/UserEditForm'
class EditableCell extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false,
    }
  }
  handleChange (e) {
    const value = e.target.value;
    this.setState({ value });
  }
  check (){
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit (){
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check.bind(this)}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
    );
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      width:'15%'
    }, {
      title: '年龄',
      dataIndex: 'age',
      width:'15%'
    },{
      title: '性别',
      dataIndex: 'genderText',
      width:'15%'
    },{
      title: '邮箱',
      dataIndex: 'email',
      width:'15%'
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      width:'15%'
    },{
      title: '操作',
      dataIndex: 'operation',
      width:'25%',
      render: (text, record, index) => {
        return (
            <div>
              <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(record.id)}>
                <a href="javascript:;" style={{marginRight:'10px'}}>删除</a>
              </Popconfirm>
              <a href="javascript:;" style={{marginRight:'10px'}} onClick={() => this.onModify(record.id,index)}>修改</a>
              <Popconfirm title="确认禁言?" onConfirm={() => this.onForbidden(record.id)}>
                <a href="javascript:;" style={{marginRight:'10px'}}>禁言</a>
              </Popconfirm>
            </div>
        );
      },
    }];

    this.state = {
      dataSource:[],
      count: 2,
      current: 1,
      total: 0,
      showPop: false,
      isLoading: false
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getGenderText (gender) {
    var genderText;
    switch (gender) {
      case 'm':
        genderText = '男';
        break;
      case 'f':
        genderText = '女';
        break;
      case 'x':
        genderText = '保密';
        break;
      default:
        genderText = '男';
        break;
    }
    return genderText;
  }
  getUser (name,pNo) {
    var _this = this;
    axios.get( Base.API + 'user', {params: {
      name: name || '',
      pageNo: pNo || 1,
      pageSize: 8
    }}).then( result => {
      if (result.status == 200) {
        var dataSource = [], count = 0;
        var d = result.data.data;
        var total = Math.ceil(result.data.count / result.data.pageSize) * 10;
        d.map(function(v,i){
          var json = {};
          json.key = i;
          json.id = v._id;
          json.name = v.name;
          json.age = v.age;
          json.gender = v.gender;
          json.genderText = _this.getGenderText(v.gender);
          json.email = v.email;
          json.createTime = moment(v.create_date).format().replace('T',' ').split('+')[0];;
          dataSource.push(json)
        });

        count = dataSource.length;
        _this.setState((prevState, props) => {
          return {
            dataSource:dataSource, 
            count:count,
            total:total,
            showPop:false,
            isLoading: false
          };
        });

      } else {
        alert('错误');
        _this.setState({
          isLoading: false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  onCellChange (index, key) {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete (id) {
    axios.post(Base.API + 'user/delete',{id: id})
      .then( result => {
        if (result.status === 200 && result.data.ok === 1) {
          var name = this.state.searchVal;
          this.getUser(name);
        }
      })
      .catch( err => {
        console.log(err)
      })
  }
  onModify (id,index) {
    this.setState({
      showPop: true,
      infos: [...this.state.dataSource][index]
    })
  }
  onForbidden (id) {
  }
  handleAdd () {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }

  onChange(page){
    var name = this.state.searchVal;
    this.setState({
      current: page,
      isLoading: true
    });
    this.getUser(name,page)
  }
  handleChangeSearchInput(e) {
    var searchVal = e.target.value;
    this.setState({
      searchVal: searchVal
    })
  }
  handleSearch () {
    var name = this.state.searchVal;
    this.setState({
      isLoading: true,
      current: 1,
    })
    this.getUser(name,1);

  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
         <div className="example-input">
          <Input size="large" placeholder="输入用户名" onChange = {this.handleChangeSearchInput.bind(this)} />
          <Button type="primary" icon="search" size='large' onClick = { this.handleSearch.bind(this) } >搜索</Button>
        </div>
        <UserEdit 
          showPop = {this.state.showPop} 
          infos = {this.state.infos}
          getUser = {this.getUser.bind(this)}
        />
        <Table bordered dataSource={dataSource} columns={columns} pagination = {false} loading = {this.state.isLoading}/><br />
        { this.state.total > 0 ? 
          <Pagination current={this.state.current} onChange={this.onChange.bind(this)} total={this.state.total} /> 
        : null}
      </div>
    );
  }
}

export default UserList;