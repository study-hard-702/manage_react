import * as constants from './constants';

export function getProList(data: any) {
  return {
    type: constants.GET_PROLIST,
    data: data,
  }
}

export function setProList(proList: any, proListDesc: any) {
  return {
    type: constants.SET_PROLIST,
    proList: proList,
    proListDesc: proListDesc
  }
}

