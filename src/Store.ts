import { STATE_SCOPE } from "./constants";
import { reducer } from "./reducer";

const initialState = {
  currentDescribeBlock: null
};

export class Store {
  private [STATE_SCOPE] = initialState;

  getState() {
    return this[STATE_SCOPE];
  }

  dispatch(action) {
    this[STATE_SCOPE] = reducer(this[STATE_SCOPE], action);
  }
}
