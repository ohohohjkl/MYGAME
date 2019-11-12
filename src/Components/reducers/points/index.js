import * as reducerType from '../../Assistance/reducerType';
import { lastRecord, maxPoint } from '../../Assistance/const';

let initState = lastRecord && !isNaN(parseInt(lastRecord.points, 10)) ?
  parseInt(lastRecord.points, 10) : 0;

if (initState < 0) {
  initState = 0;
} else if (initState > maxPoint) {
  initState = maxPoint;
}

const points = (state = initState, action) => {
  switch (action.type) {
    case reducerType.POINTS:
      return action.data > maxPoint ? maxPoint : action.data; // 最大分数
    default:
      return state;
  }
};

export default points;
