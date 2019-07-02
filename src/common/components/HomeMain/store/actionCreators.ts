import * as constants from './constants';

export function switchFullscreen(fullScreenFlag: boolean) {
  return {
    type: constants.SWITCH_FULLSCREEN,
    fullScreenFlag: fullScreenFlag,
  }
}


