import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  loginStatus: false,
});

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.CHANGE_LOGINSTATUS:
      return state.set('loginStatus', action.loginStatus);
    default:
      return state;
  }
}