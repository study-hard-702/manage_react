import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/index';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

// 用于 applyMiddleware 阶段之后执行 Sagas，返回一个 Task 描述对象。
sagaMiddleware.run(rootSaga);

export default store;
