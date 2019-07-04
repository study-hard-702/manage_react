import {call, put, takeEvery} from 'redux-saga/effects';
import {
  CHANGE_LOGINSTATUS,
  GET_NAV,
  SET_NAV,
  GET_PROLIST,
  SET_PROLIST,
} from '../../pages/home/store/constants';
import {CHANGE_LOGIN} from '../../pages/login/store/constants';
import {
  fetchLogin,
  fetchGetNav,
  fetchGetProList
} from '../../api/index';
import {gotoPath} from '../../utils/history';

function* login(action: any) {
  const myFetch = function () {
    const userame = action.data.userame;
    const password = action.data.password;
    return fetchLogin({
      userame: userame,
      password: password
    }).then((res) => {
      const result = res.data
      return result
    })
  }
  // 执行 myFetch 函数，返回值赋值给 res
  const res = yield call(myFetch)
  console.log('res', res)
  if (res.resultCode === 1) {
    window.sessionStorage.setItem('loginStatus', '1')
    gotoPath('/home');
    // dispatch 一个 action 到 reducer, payload 是请求返回的数据
    yield put({
      type: CHANGE_LOGINSTATUS,
      loginStatus: res.data
    })
  }
}

function* getNav() {
  const myFetch = function () {
    return fetchGetNav({}).then((res) => {
      const result = res.data
      return result
    })
  }
  // 执行 myFetch 函数，返回值赋值给 res
  const res = yield call(myFetch)
  console.log('res', res)
  if (res.resultCode === 1) {
    // dispatch 一个 action 到 reducer, payload 是请求返回的数据
    yield put({
      type: SET_NAV,
      data: res.data
    })
  }
}

function* getProList() {
  const myFetch = function () {
    return fetchGetProList({}).then((res) => {
      const result = res.data
      return result
    })
  }
  // 执行 myFetch 函数，返回值赋值给 res
  const res = yield call(myFetch)
  console.log('res', res)
  if (res.status === '200') {
    // dispatch 一个 action 到 reducer, payload 是请求返回的数据
    let data: any = [];
    let productStatus = ["", "初始", "待审核", "审核未通过", "已发布", "审核通过"];
    let productTypes = ["", "旅游保险", "意外保险", "行李保险", "家庭保险", "健康保险", "责任险"];
    res.data.data.forEach((item: any, index: number) => {
      let obj: any = {};
      obj.num = index + 1;
      obj.product_code = item.product_code;
      obj.product_name = item.product_name;
      obj.productType = productTypes[item.type];
      obj.demand_number = item.demand_number;
      obj.url = item.url;
      obj.status = productStatus[item.status];
      obj.update_time = item.update_time;
      obj.handel = '修改 提交 审核';
      data.push(obj)
    })
    yield put({
      type: SET_PROLIST,
      data: data,
    })
  }
}

// 在store.js中，执行了 sagaMiddleware.run(rootSaga)
function* rootSaga(): any {
  yield takeEvery(CHANGE_LOGIN, login);
  yield takeEvery(GET_NAV, getNav);
  yield takeEvery(GET_PROLIST, getProList)
}

// 导出 rootSaga，被 store.js 文件 import
export default rootSaga;