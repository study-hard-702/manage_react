import axios from 'axios';
import Qs from 'qs';

// 请求的拦截器 定义传参形式
axios.interceptors.request.use((config: any) => {
  // 判断请求的类型
  // 如果是 post 请求就把默认参数拼到 data 里面
  // 如果是 get 请求就拼到 params 里面
  // config.withCredentials = true
  if (config.method === 'post') {
    if (config.responseType === 'form') {
      const data = Qs.parse(config.data);
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      config.data = Qs.stringify({
        ...data,
      });
    }
  } else if (config.method === 'get') {
    config.params = {
      ...config.data,
    };
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// http response 服务器响应拦截器
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 404:
        error.message = '网络竟然崩溃了，别紧张，试试刷新一下页面';
        break;
      case 500:
        error.message = '哎呀，数据获取失败...您可以返回首页重新投保哦';
        break;
      case 502:
        error.message = '抱歉，暂时服务不可用，请稍后重试';
        break;
      case 503:
        error.message = '抱歉，暂时服务不可用，请稍后重试';
        break;
      default:
        error.message = '系统繁忙，请稍后重试';
    }
  }
  return Promise.reject(error);
});

// 去除空格
const raplaceStrBody = (str: string) => {
  let strBody: string = String(str);
  if (strBody.indexOf(' ') > -1 || /\r\n/g.test(strBody)) {
    strBody = strBody.replace(' ', '');
    strBody = strBody.replace(/\r\n/g, '');
    strBody = raplaceStrBody(strBody);
  }
  return strBody;
};

const afterHandle = (body: any) => {
  let bodyStr = raplaceStrBody(JSON.stringify(body));
  const jsonData = {
    ...JSON.parse(bodyStr),
  };
  return jsonData;
};

async function axoisHttp({body, config}: any) {
  const {url, method, responseType} = config;
  console.log('method', method)
  const promise = await axios({
      url,
      // method,
      responseType,
      data: afterHandle(body),
    },
  );
  return promise;
}

export default function fetch(config: any) {
  return (body: any) => {
    let result;
    result = axoisHttp({body, config});
    return result;
  };
}
