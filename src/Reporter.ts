// https://github.com/twosmalltrees/pretzel-test/blob/master/src/reporter.ts
//
// Listen events and log appropriate message
// So, there's a class specially for reporting and we
// don't have console.log in multiple places of the module

import { EventManager } from "./EventManager";

export class Reporter {
  constructor(private eventManager: EventManager) {}

  init() {
    this.eventManager.emit("testSuiteStarted", () => {
      console.log("testSuiteStarted");
    });

    this.eventManager.on("testSuiteCompleted", () => {
      console.log("testSuiteCompleted");
    });
  }
}
