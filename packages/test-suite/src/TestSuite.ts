import { Store } from "@j.u.p.iter/jtrun-store";

import {
  ActionType,
  DescribeBlock,
  ItBlock,
  ItStatus,
  TestBlockType,
  TestHook,
  TestHookType,
  TestSuiteStatus
} from "@j.u.p.iter/jtrun-types";

export interface TestBlock {
  description: string;
  callback: () => void;
}

export type TestBlocks = TestBlock[];

export class TestSuite extends Store {
  private createDescribe(description: string, fn: () => void): DescribeBlock {
    return {
      description,
      fn,
      type: TestBlockType.DESCRIBE,
      children: [],
      hooks: []
    };
  }

  private createIt(description: string, fn: () => void): ItBlock {
    return {
      description,
      fn,
      type: TestBlockType.IT,
      status: ItStatus.INACTIVE,
      error: null
    };
  }

  private createTestHook(type: TestHookType, fn: () => void): TestHook {
    return { fn, type };
  }

  private declareTestHelpers() {
    (global as any).describe = (description: string, fn: () => void) => {
      const newDescribe = this.createDescribe(description, fn);

      this.dispatch({
        type: ActionType.START_DESCRIBE,
        payload: { describe: newDescribe }
      });

      fn();

      this.dispatch({
        type: ActionType.FINISH_DESCRIBE,
        payload: { describe: newDescribe }
      });
    };

    (global as any).it = (description: string, fn: () => void) => {
      this.dispatch({
        type: ActionType.RUN_IT,
        payload: { it: this.createIt(description, fn) }
      });
    };

    (global as any).beforeEach = (fn: () => void) => {
      this.dispatch({
        type: ActionType.RUN_BEFORE_EACH,
        payload: {
          beforeEach: this.createTestHook(TestHookType.BEFORE_EACH, fn)
        }
      });
    };

    (global as any).afterEach = (fn: () => void) => {
      this.dispatch({
        type: ActionType.RUN_AFTER_EACH,
        payload: {
          afterEach: this.createTestHook(TestHookType.AFTER_EACH, fn)
        }
      });
    };
  }

  constructor(public testFilePath: string) {
    super();

    this.declareTestHelpers();

    require(testFilePath);
  }

  public setStatus(status: TestSuiteStatus) {
    this.status = status;
  }

  public status: TestSuiteStatus = TestSuiteStatus.INACTIVE;
}
