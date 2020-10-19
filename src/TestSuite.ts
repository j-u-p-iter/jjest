import { Store } from "./Store";
import {
  DescribeBlock,
  ItBlock,
  TestBlockType,
  TestHook,
  TestHookType
} from "./types";

export interface TestBlock {
  description: string;
  callback: () => void;
}

export type TestBlocks = TestBlock[];

export class TestSuite extends Store {
  private createDescribe(description, fn): DescribeBlock {
    return {
      description,
      fn,
      type: TestBlockType.Describe,
      children: [],
      hooks: []
    };
  }

  private createIt(description, fn): ItBlock {
    return {
      description,
      fn,
      type: TestBlockType.It
    };
  }

  private createTestHook(type: TestHookType, fn: () => void): TestHook {
    return { fn, type };
  }

  private declareTestHelpers() {
    (global as any).describe = (description, fn) => {
      const newDescribe = this.createDescribe(description, fn);

      this.dispatch({
        type: "START_DESCRIBE",
        payload: { describe: newDescribe }
      });

      fn();

      this.dispatch({
        type: "FINISH_DESCRIBE",
        payload: { describe: newDescribe }
      });
    };

    (global as any).it = (description, fn) => {
      this.dispatch({
        type: "RUN_IT",
        payload: { it: this.createIt(description, fn) }
      });
    };

    (global as any).beforeEach = fn => {
      this.dispatch({
        type: "RUN_BEFORE_EACH",
        payload: {
          beforeEach: this.createTestHook(TestHookType.BeforeEach, fn)
        }
      });
    };

    (global as any).afterEach = fn => {
      this.dispatch({
        type: "RUN_AFTER_EACH",
        payload: {
          afterEach: this.createTestHook(TestHookType.AfterEach, fn)
        }
      });
    };
  }

  constructor(public testFilePath) {
    super();

    this.declareTestHelpers();

    require(testFilePath);
  }
}
