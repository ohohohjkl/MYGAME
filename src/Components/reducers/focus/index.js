import * as reducerType from '../../Assistance/reducerType';
import { isFocus } from '../../Assistance/';

const initState = isFocus();
const focus = (state = initState, action) => {
  switch (action.type) {
    case reducerType.FOCUS:
      return action.data;
    default:
      return state;
  }
};

export default focus;
