import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  navTree: [],
  navList: [],
  currentNav: {},
});

export default (state = defaultState, action: any) => {
  const navList = state.get('navList');
  switch (action.type) {
    case constants.SET_NAV:
      return state.merge({
        navTree: action.data,
      })
    case constants.SELECT_NODE:
      const flag = navList.some((item: any) => {
        return item.id === action.data.id
      })
      return state.merge({
        currentNav: action.data,
        navList: flag ? navList : navList.push(action.data)
      })
    case constants.DELETE_NODE:
      const newNavList = navList.filter((item: any) => {
        return item.id !== action.id
      })
      return state.set('navList', newNavList);
    default:
      return state;
  }
}