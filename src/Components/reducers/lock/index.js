import * as reducerType from '../../Assistance/reducerType';
var lastRecord = require('../../Assistance/const').lastRecord;;

const initState = lastRecord && lastRecord.lock !== undefined ? !!lastRecord.lock : false;

const lock = (state = initState, action) => {
  switch (action.type) {
    case reducerType.LOCK:
      return action.data;
    default:
      return state;
  }
};

export default lock;
