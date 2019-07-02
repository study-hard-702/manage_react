import {call, put, takeEvery} from 'redux-saga/effects';
import {CHANGE_LOGINSTATUS} from '../../common/Header/store/constants';
import {GET_NAV, SET_NAV} from '../../common/components/HomeNav/store/constants';
import {CHANGE_LOGIN} from '../../pages/login/store/constants';

import {gotoPath} from '../../utils/history';
import {fetchLogin, fetchGetNav} from '../../api/index';


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


// 在store.js中，执行了 sagaMiddleware.run(rootSaga)
function* rootSaga(): any {
  yield takeEvery(CHANGE_LOGIN, login);
  yield takeEvery(GET_NAV, getNav)
}

// 导出 rootSaga，被 store.js 文件 import
export default rootSaga;