import Home from '../components/Home.jsx';

import Guest from '../components/panel/Guest.jsx';
import Users from '../components/panel/Users.jsx';
import Articles from '../components/panel/Articles.jsx';

import UserList from '../components/userManage/UserList.jsx';

import ArticleList from '../components/articleManage/ArticleList.jsx';
import ModuleList from '../components/articleManage/ModuleList.jsx';

import EditArticle from '../components/articleManage/EditArticle.jsx';

const routes = [
    // {
    //     path: '/',
    //     exact: true,
    //     content: Home
    // },
    {
        path: '/app/panel/guest/',
        content: Guest
    },
    {
        path: '/app/panel/users',
        content: Users
    },
    {
        path: '/app/panel/articles',
        content: Articles
    },
    {
        path: '/app/userManage/userList',
        content: UserList
    },
    {
        path: '/app/articleManage/articleList',
        content: ArticleList
    },
    {
        path: '/app/articleManage/moduleList',
        content: ModuleList
    },
    {
        path: '/app/edit/:id',
        content: EditArticle
    }
];

export default routes;