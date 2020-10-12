import { EventManager } from './EventManager';

import{ TestSuite } from './TestSuite';

export class Queue {
  constructor(private eventManager: EventManager) {}

  public init() {
    let testsSuites = [];

    this.eventManager.on('scanTestFiles', (testFiles) => {
      for (const testFile in testFiles) {
        const testSuite = new TestSuite(testFile);

        testsSuites.push(testSuite);
      }
    });

    this.eventManager.emit('testsSuitesCreated', testsSuites);
  }
}
