import * as constants from './constants';

export function getNav() {
  return {
    type: constants.GET_NAV,
  }
}

export function selectNode(obj: any) {
  return {
    type: constants.SELECT_NODE,
    data: obj
  }
}

export function deleteNode(id: any) {
  return {
    type: constants.DELETE_NODE,
    id: id
  }
}

export function handleNode(handleType: any) {
  return {
    type: constants.HANDLE_NODE,
    handleType: handleType
  }
}

