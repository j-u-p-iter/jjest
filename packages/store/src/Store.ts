import { Action } from "@j.u.p.iter/jtrun-types";

import { reducer } from "./reducer.js";

import { StoreState } from "./types.js";

export class Store {
  private state: StoreState = {
    currentDescribeBlock: null,
    rootDescribeBlock: null,
  };

  public getState() {
    return this.state;
  }

  public dispatch(action: Action) {
    this.state = reducer(this.state, action);
  }
}
