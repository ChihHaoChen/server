import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false; //payload contains users' data, and if the user's data is not available yet, then we would return "false"
    default:
      return state;
  }
}
