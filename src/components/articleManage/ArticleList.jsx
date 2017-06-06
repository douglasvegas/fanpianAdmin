import React from 'react';
import { Table, Input, Icon, Button, Popconfirm , Pagination} from 'antd';

var axios = require('axios');
var moment = require('moment');
var Base = require('../../baseConst.js')
var token = window.localStorage.getItem('token');
axios.defaults.headers.common['x-access-token'] = token;
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

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

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '作者',
      dataIndex: 'author',
      width:'15%'
    }, {
      title: '发表时间',
      dataIndex: 'createTime',
      width:'15%'
    }, {
      title: '点赞数',
      dataIndex: 'views',
      width:'15%'
    },{
      title: '收藏数',
      dataIndex: 'collections',
      width:'15%'
    },{
      title: '标题',
      dataIndex: 'title',
      width:'15%'
    },{
      title: '模块',
      dataIndex: 'module',
      width:'15%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
            <div>
              <Popconfirm title="确认删除?" onConfirm={() => this.onDelete(record.articleId)}>
                <a href="javascript:;" style={{marginRight:'10px'}}>删除</a>
              </Popconfirm>
              <Link to = {'/app/edit/' + record.articleId} style={{marginRight:'10px'}} >
                修改
              </Link>  
            </div>
        );
      },
    }];

    this.state = {
      dataSource:[],
      count: 2,
      current: 1,
      total: 0,
      isLoading: false
    };
  }
  componentDidMount() {
    this.getArticelList();
  }
  getArticelList (pNo) {
    var _this = this;
    axios.post( Base.API + 'post/all', {
      title: this.state.searchTitle || '',
      content: this.state.searchContent || '',
      pageNo: pNo || 1,
      pageSize: 8
    }).then( result => {
      if (result.status == 200) {
        var dataSource = [], count = 0;
        var d = result.data.data;
        var total = Math.ceil(result.data.count / result.data.pageSize) * 10;
        for (var i = 0; i < d.length; i++ ) {
          var v = d[i];
          dataSource[i] = {};
          var name = '已删除';
          v.author ? name = v.author.name : '';
          dataSource[i].key = i;
          dataSource[i].author = name;
          dataSource[i].createTime = moment(v.create_date).format().replace('T',' ').split('+')[0];
          dataSource[i].views = v.pv;
          dataSource[i].collections = v.keep;
          dataSource[i].title = v.title;
          dataSource[i].articleId = v._id;

        }
        count = dataSource.length;
        _this.setState((prevState, props) => {
          return {
            dataSource: dataSource, 
            count:count,
            total:total,
            isLoading: false
          };
        });

      } else {
        _this.setState({
          isLoading: false
        })
      }
    }).catch(err => {
         _this.setState({
          isLoading: false
        })
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
    axios.post(Base.API + 'post/delete',{ id: id })
      .then( result => {
        if (result.status === 200 && result.data.ok === 1) {
          this.getArticelList();
        }else{
          alert(result.data.msg)
        }
      })
      .catch( err => {
        console.log(err)
      })
  }
  onModify (articleId) {

  }
  onChange(page){
    this.setState({
      current: page,
      isLoading: true
    });
    this.getArticelList(page)
  }
  handleChangeSearchTitle (e) {
    var searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    })
  }
  handleChangeSearchContent (e) {
    var searchContent = e.target.value;
    this.setState({
      searchContent: searchContent
    })
  }
  handleSearch() {
    this.setState({
      isLoading: true
    })
    this.getArticelList(1);
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <div className="example-input">
          <Input size="large" placeholder="请输入标题"  onChange = {this.handleChangeSearchTitle.bind(this)} />
          <Input size="large" placeholder="请输入内容"  onChange = {this.handleChangeSearchContent.bind(this)}  />
          <Button type="primary" icon="search" size='large' onClick = { this.handleSearch.bind(this) } >搜索</Button>
        </div>
        <Table bordered dataSource={dataSource} columns={columns} pagination = {false} loading = {this.state.isLoading}/><br />
        { this.state.total > 0 ? 
          <Pagination current={this.state.current} onChange={this.onChange.bind(this)} total={this.state.total} /> 
        : null}
      </div>
    );
  }
}

export default ArticleList;