import { Store } from "./Store";
import { DescribeBlock, ItBlock, TestBlockType } from "./types";

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

      console.log(this.getState());
    };

    (global as any).beforeEach = () => {};

    (global as any).afterEach = () => {};
  }

  constructor(public testFilePath) {
    super();

    this.declareTestHelpers();

    require(testFilePath);
  }
}
