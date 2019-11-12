import * as reducerType from '../../Assistance/reducerType';
// var lastRecord = require('../../Assistance/const').lastRecord;;

var lastRecord = require('../../Assistance/const').lastRecord;


let initState = lastRecord && !isNaN(parseInt(lastRecord.clearLines, 10)) ?
  parseInt(lastRecord.clearLines, 10) : 0;
if (initState < 0) {
  initState = 0;
}

const clearLines = (state = initState, action) => {
  switch (action.type) {
    case reducerType.CLEAR_LINES:
      return action.data;
    default:
      return state;
  }
};

export default clearLines;
