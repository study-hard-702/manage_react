import {fromJS} from "immutable"

const defaultState = fromJS({});

export default (state = defaultState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
}