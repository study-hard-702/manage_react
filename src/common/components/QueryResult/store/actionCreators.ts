import * as constants from './constants';
export function getProList() {
  return {
    type: constants.GET_PROLIST
  }
}

export function setProList(proList: any, proListDesc: any) {
  return {
    type: constants.SET_PROLIST,
    proList: proList,
    proListDesc: proListDesc
  }
}

