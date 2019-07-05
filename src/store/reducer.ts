import {combineReducers} from 'redux-immutable'
import {connectRouter} from 'connected-react-router'
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as loginReducer} from '../pages/login/store';
import {reducer as QueryResultReducer} from '../common/components/QueryResult/store';

import history from '../utils/history';

const reducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  queryresult: QueryResultReducer,
  router: connectRouter(history),
});

export default reducer;
