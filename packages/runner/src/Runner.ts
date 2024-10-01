// https://github.com/twosmalltrees/pretzel-test/blob/master/src/runner.ts

import { EventManager } from "@j.u.p.iter/jtrun-event-manager";
import { delay, isDescribeBlock } from "@j.u.p.iter/jtrun-helpers";
import { TestSuite } from "@j.u.p.iter/jtrun-test-suite";
import { TestHook, TestHookType, TestSuiteStatus, TrunEvent } from "@j.u.p.iter/jtrun-types";

export class Runner {
  private runBeforeEachHooks(hooks: TestHook[]) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.BEFORE_EACH
    );

    this.runHooks(resultHooks);
  }

  public runAfterEachHooks(hooks: TestHook[]) {
    const resultHooks = hooks.filter(
      ({ type }) => type === TestHookType.AFTER_EACH
    );

    this.runHooks(resultHooks);
  }

  private runHooks(hooks: TestHook[]) {
    for (const hook of hooks) {
      hook.fn();
    }
  }

  private async runTestSuite(testSuite: TestSuite) {
    const rootDescribeBlock = testSuite.getState().rootDescribeBlock;

    const run = async describeBlock => {
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

            this.runAfterEachHooks(childTestBlock.parent.hooks);
          } catch (error) {
            testSuite.setStatus(TestSuiteStatus.FAILED);

            testSuite.dispatch({
              type: "FAIL_IT",
              payload: { error, it: childTestBlock }
            });
          }
        }
      }
    };

    await delay();

    testSuite.setStatus(TestSuiteStatus.RUNS);
    this.eventManager.emit(TrunEvent.RUN_TEST_SUITE, testSuite);

    await delay(() => run(rootDescribeBlock));

    if (testSuite.status === TestSuiteStatus.RUNS) {
      testSuite.setStatus(TestSuiteStatus.PASSED);
    }

    this.eventManager.emit(TrunEvent.FINISH_TEST_SUITE, testSuite);
  }

  private async runTestsSuites(testsSuites: TestSuite[]) {
    for (const testSuite of testsSuites) {
      await this.runTestSuite(testSuite);
    }

    this.eventManager.emit(TrunEvent.FINISH_RUNNING_TESTS);
  }

  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on(
      TrunEvent.PARSE_TESTS_SUITES,
      (testsSuites: TestSuite[]) => {
        this.runTestsSuites(testsSuites);
      }
    );
  }
}
