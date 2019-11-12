import * as reducerType from '../../Assistance/reducerType';
var lastRecord = require('../../Assistance/const').lastRecord;;

const initState = lastRecord && lastRecord.drop !== undefined ? !!lastRecord.drop : false;

const drop = (state = initState, action) => {
  switch (action.type) {
    case reducerType.DROP:
      return action.data;
    default:
      return state;
  }
};

export default drop;
