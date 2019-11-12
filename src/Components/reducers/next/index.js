import { getNextType } from '../../Assistance';
import * as reducerType from '../../Assistance/reducerType';
import { lastRecord, blockType } from '../../Assistance/const';

const initState = lastRecord && blockType.indexOf(lastRecord.next) !== -1 ?
  lastRecord.next : getNextType();
const parse = (state = initState, action) => {
  state = 'I';
  switch (action.type) {
    case reducerType.NEXT_BLOCK:
      return action.data;
    default:
      return state;
  }
};

export default parse;
