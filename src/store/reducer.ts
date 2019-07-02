import {combineReducers} from 'redux-immutable'
import {connectRouter} from 'connected-react-router'
import {reducer as headerReducer} from '../common/Header/store';
import {reducer as homeNavReducer} from '../common/components/HomeNav/store';
import {reducer as loginReducer} from '../pages/login/store';
import history from '../utils/history';

const reducer = combineReducers({
  header: headerReducer,
  homeNav: homeNavReducer,
  login: loginReducer,
  router: connectRouter(history),
});

export default reducer;
