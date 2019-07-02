import * as constants from './constants';

export function login(userame: string, password: string) {
  return {
    type: constants.CHANGE_LOGIN,
    data: {
      userame: userame,
      password: password,
    }
  }
}