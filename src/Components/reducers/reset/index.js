import * as reducerType from '../../Assistance/reducerType';
var lastRecord = require('../../Assistance/const').lastRecord;;

const initState = lastRecord && lastRecord.reset ? !!lastRecord.reset : false;
const reset = (state = initState, action) => {
  switch (action.type) {
    case reducerType.RESET:
      return action.data;
    default:
      return state;
  }
};

export default reset;
