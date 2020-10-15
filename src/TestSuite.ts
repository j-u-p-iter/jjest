import { Store } from "./Store";
import { DescribeBlock, TestBlockType } from "./types";

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

  private declareTestHelpers() {
    (global as any).describe = (description, fn) => {
      this.dispatch({
        type: "START_DESCRIBE",
        payload: { describe: this.createDescribe(description, fn) }
      });

      console.log(this.getState());
    };

    (global as any).it = () => {};

    (global as any).beforeEach = () => {};

    (global as any).afterEach = () => {};
  }

  constructor(public testFilePath) {
    super();

    this.declareTestHelpers();

    require(testFilePath);
  }
}
