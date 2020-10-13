// https://github.com/twosmalltrees/pretzel-test/blob/master/src/runner.ts
//
// Here we run the queue, prepared by the Queue, for each TestSuite.
import { EventManager } from "./EventManager";
import { TestSuite } from "./TestSuite";

export class Runner {
  private runIts(its: Array<{ description: string; callback: () => void }>) {
    for (const it of its) {
      try {
        it.callback();
      } catch (error) {}
    }
  }

  private runTestSuite(testSuite: TestSuite) {
    this.eventManager.emit("testSuiteStarted", testSuite);

    this.runIts(testSuite.its);

    this.eventManager.emit("testSuiteCompleted", testSuite);
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
