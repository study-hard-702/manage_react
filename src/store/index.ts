import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import rootSaga from './saga/index';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    autoRehydrate(),
  )
);
persistStore(store)

// 用于 applyMiddleware 阶段之后执行 Sagas，返回一个 Task 描述对象。
sagaMiddleware.run(rootSaga);

export default store;
