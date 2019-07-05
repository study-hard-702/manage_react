import * as constants from './constants';
import {fromJS} from "immutable"

const defaultState = fromJS({
  loginStatus: false,
  fullScreenFlag: false,
  navTree: [],
  navList: [],
  currentNav: {},
  dataSource: [],
  proListDesc: {},
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
      return state.merge({
        navList: action.newNavList,
        currentNav: action.newCurrentNav
      })
    case constants.HANDLE_NODE:
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
      break;
    default:
      return state;
  }
}