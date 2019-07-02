import fetch from './config/fetch';

// 接口统一管理
let BASE_PATH = '/mock';

// 登陆
export const fetchLogin = fetch({
  url: `${BASE_PATH}/login.json`,
  method: 'post',
});

// 获取首页导航
export const fetchGetNav = fetch({
  url: `${BASE_PATH}/getNav.json`,
  method: 'post',
});