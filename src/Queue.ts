import { EventManager } from "./EventManager";

import { TestSuite } from "./TestSuite";

export class Queue {
  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on("scanTestFiles", testFiles => {
      console.log(testFiles);
      const testsSuites = testFiles.map(testFile => {
        const testSuite = new TestSuite(testFile);

        testsSuites.push(testSuite);
      });

      this.eventManager.emit("createTestsSuites", testsSuites);
    });
  }
}
