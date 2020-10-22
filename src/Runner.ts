// https://github.com/twosmalltrees/pretzel-test/blob/master/src/runner.ts
//
// Here we run the queue, prepared by the Queue, for each TestSuite.
import { EventManager } from "./EventManager";
import { isDescribeBlock } from "./helpers";
import { TestSuite } from "./TestSuite";
import { TestHookType, TestSuiteStatus } from "./types";

export class Runner {
  private runBeforeEachHooks(hooks) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.BEFORE_EACH
    );

    this.runHooks(resultHooks);
  }

  public runAfterEachHooks(hooks) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.AFTER_EACH
    );

    this.runHooks(resultHooks);
  }

  private runHooks(hooks) {
    for (const hook of hooks) {
      hook.fn();
    }
  }

  private runTestSuite(testSuite: TestSuite) {
    const rootDescribeBlock = testSuite.getState().rootDescribeBlock;

    const run = describeBlock => {
      for (const childTestBlock of describeBlock.children) {
        if (isDescribeBlock(childTestBlock)) {
          run(childTestBlock);
        } else {
          try {
            this.runBeforeEachHooks(childTestBlock.parent.hooks);

            testSuite.dispatch({
              type: "START_IT",
              payload: { it: childTestBlock }
            });

            childTestBlock.fn();

            testSuite.dispatch({
              type: "FINISH_IT",
              payload: { it: childTestBlock }
            });

            testSuite.dispatch("");
            this.runAfterEachHooks(childTestBlock.parent.hooks);
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    testSuite.setStatus(TestSuiteStatus.RUNS);
    this.eventManager.emit('runTestSuite', testSuite);

    run(rootDescribeBlock);

    testSuite.setStatus(TestSuiteStatus.FAILED);
    this.eventManager.emit('finishTestSuite', testSuite);
  }

  private runTestsSuites(testsSuites: TestSuite[]) {
    for (const testSuite of testsSuites) {
      this.runTestSuite(testSuite);
    }
  }

  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on("createTestsSuites", (testsSuites: TestSuite[]) => {
      this.runTestsSuites(testsSuites);
    });
  }
}
