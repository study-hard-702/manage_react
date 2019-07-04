import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  proList: [],
  proListDesc: {},
});

export default (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.SET_PROLIST:
      return state.merge({
        proList: action.proList,
        proListDesc: action.proListDesc,
      })
    default:
      return state;
  }
}