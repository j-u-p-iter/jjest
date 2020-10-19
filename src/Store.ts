import { reducer } from "./reducer";
import { DescribeBlock } from "./types";

interface StoreState {
  currentDescribeBlock: DescribeBlock | null;
  rootDescribeBlock: DescribeBlock | null;
}

export class Store {
  private state: StoreState = {
    currentDescribeBlock: null,
    rootDescribeBlock: null
  };

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = reducer(this.state, action);
  }
}
