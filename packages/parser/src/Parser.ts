import { EventManager } from "@j.u.p.iter/jtrun-event-manager";
import { TrunEvent } from "@j.u.p.iter/jtrun-types";
import { TestSuite } from "@j.u.p.iter/jtrun-test-suite";

/**
 * The running tests process consists of multiple steps.
 *
 * The "Parser" is the second step of such process.
 *
 * The purpose of this step is to parse a code in the files, using files paths,
 *   that were found on the previous step.
 *
 * The result of parsing of each test suite is the testSuite instance,
 *   that contains parsed version of the original code. We need this
 *   structure to:
 *     - run tests correctly;
 *     - process results of running tests properly.
 *
 * A communication between the different parts of running tests process
 *   happens with events. After code in all files is successfully parsed
 *   "parseTestsSuites" event is emitted by the Parser to send result testsSuites
 *   to the next step.
 *
 */

export class Parser {
  constructor(private eventManager: EventManager) {}

  public init() {
    this.eventManager.on(TrunEvent.SCAN_TEST_FILES, (testFiles: string[]) => {
      const testsSuites = testFiles.map(testFile => {
        const testSuite = new TestSuite(testFile);

        return testSuite;
      });

      this.eventManager.emit(TrunEvent.PARSE_TESTS_SUITES, testsSuites);
    });
  }
}
