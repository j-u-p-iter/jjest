// https://github.com/twosmalltrees/pretzel-test/blob/master/src/runner.ts
//
// Here we run the queue, prepared by the Queue, for each TestSuite.
import { EventManager } from './EventManager';
import { TestSuite } from './TestSuite';

export class Runner {
  private runIts(its: { description: string; callback: () => void; }[]) {
    for(const it of its) {
      this.eventManager.emit('runIt', it.description);
      try {
        it.callback();
        this.eventManager.emit('runItSuccess');
      } catch(error) {
        this.eventManager.emit('runItError', error);
      }
    }
  }

  private runTestSuite(testSuite: TestSuite) {
    this.runIts(testSuite.its);
  }

  private runTestsSuites(testsSuites: TestSuite[]) {
    for (const testSuite of testsSuites) {
      this.runTestSuite(testSuite);
    } 
  }

  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on('createTestsSuites', (testsSuites: TestSuite[]) => {
      this.runTestsSuites(testsSuites);
    });
  }
}
