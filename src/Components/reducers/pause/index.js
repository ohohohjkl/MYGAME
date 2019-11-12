import * as reducerType from '../../Assistance/reducerType';
var lastRecord = require('../../Assistance/const').lastRecord;;

const initState = lastRecord && lastRecord.pause !== undefined ? !!lastRecord.pause : false;
const pause = (state = initState, action) => {
  switch (action.type) {
    case reducerType.PAUSE:
      return action.data;
    default:
      return state;
  }
};

export default pause;
