// https://github.com/twosmalltrees/pretzel-test/blob/master/src/runner.ts
//
// Here we run the queue, prepared by the Queue, for each TestSuite.
import { EventManager } from "./EventManager";
import { isDescribeBlock } from "./helpers";
import { TestSuite } from "./TestSuite";
import { DescribeBlock, TestHookType } from "./types";

export class Runner {
  private runBeforeEachHooks(hooks) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.BeforeEach
    );

    this.runHooks(resultHooks);
  }

  public runAfterEachHooks(hooks) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.AfterEach
    );

    this.runHooks(resultHooks);
  }

  private runHooks(hooks) {
    for (const hook of hooks) {
      hook.fn();
    }
  }

  private runTestSuite(testBlock: DescribeBlock) {
    for (const childTestBlock of testBlock.children) {
      if (isDescribeBlock(childTestBlock)) {
        this.runTestSuite(childTestBlock);
      } else {
        try {
          this.runBeforeEachHooks(childTestBlock.parent.hooks);
          childTestBlock.fn();
          this.runAfterEachHooks(childTestBlock.parent.hooks);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  private runTestsSuites(testsSuites: TestSuite[]) {
    for (const testSuite of testsSuites) {
      this.runTestSuite(testSuite.getState().rootDescribeBlock);
    }
  }

  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on("createTestsSuites", (testsSuites: TestSuite[]) => {
      this.runTestsSuites(testsSuites);
    });
  }
}
