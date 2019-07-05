import {createStore, applyMiddleware, compose, Store, Middleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from "redux-logger";
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import rootSaga from './saga/index';
import reducer from './reducer';

export function configureStore(initialState?: any): any {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: any[] = [
    sagaMiddleware,
    createLogger(),
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares),
    autoRehydrate(),
  ));

  persistStore(store)

  // 用于 applyMiddleware 阶段之后执行 Sagas，返回一个 Task 描述对象。
  sagaMiddleware.run(rootSaga);

  return store;
}