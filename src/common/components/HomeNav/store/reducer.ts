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
    case constants.HANDLE_NODE:
      switch (action.handleType) {
        case 1:
          break;
        case 2:
          const NavList3 = navList.filter((item: any) => {
            return item.id !== state.getIn(['currentNav', 'id'])
          })
          return state.merge({
            navList: NavList3,
            currentNav: NavList3.get(NavList3.size - 1)
          });
          break;
        case 3:
          return state.merge({
            currentNav: {},
            navList: []
          });
          break;
        case 4:
          const NavList4 = navList.filter((item: any) => {
            return item.id === state.getIn(['currentNav', 'id'])
          })
          return state.merge({
            navList: NavList4,
            currentNav: NavList4.get(0)
          });
          break;
      }
    default:
      return state;
  }
}