import * as constants from './constants';

export function changeLoginStatus(loginStatus: boolean) {
  return {
    type: constants.CHANGE_LOGINSTATUS,
    loginStatus
  }
}