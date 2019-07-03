import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  fullScreenFlag: false
});

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.SWITCH_FULLSCREEN:
      return state.set('fullScreenFlag', action.fullScreenFlag)
    default:
      return state;
  }
}