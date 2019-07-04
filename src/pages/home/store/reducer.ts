import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  loginStatus: false,
  fullScreenFlag: false,
  navTree: [],
  navList: [],
  currentNav: {},
});

export default (state = defaultState, action: any) => {
  const navList = state.get('navList');
  switch (action.type) {
    case constants.CHANGE_LOGINSTATUS:
      return state.set('loginStatus', action.loginStatus);
    case constants.SWITCH_FULLSCREEN:
      return state.set('fullScreenFlag', action.fullScreenFlag)
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
      return state.merge({
        navList: newNavList,
        currentNav: newNavList.size >= 1 ? newNavList.get(newNavList.size - 1) : {}
      })
    case constants.HANDLE_NODE:
      if (action.handleType === 2) {
        const NavList3 = navList.filter((item: any) => {
          return item.id !== state.getIn(['currentNav', 'id'])
        })
        return state.merge({
          navList: NavList3,
          currentNav: NavList3.size >= 1 ? NavList3.get(NavList3.size - 1) : {}
        })
      }
      if (action.handleType === 3) {
        return state.merge({
          currentNav: {},
          navList: fromJS([])
        })
      }
      if (action.handleType === 4) {
        if (navList.size >= 1) {
          const NavList4 = navList.filter((item: any) => {
            return item.id === state.getIn(['currentNav', 'id'])
          })
          return state.merge({
            navList: NavList4,
            currentNav: NavList4.get(0)
          })
        } else {
          return state;
        }
      }
    default:
      return state;
  }
}