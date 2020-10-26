import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
  constructor(testsSuites) {
    for (const testSuite of testsSuites) {
      this.result.push(new TestSuiteReport(testSuite).generate());
    }
  }

  public duration: number;

  public numberOfTests: number;

  public numberOfFailedTests: number;

  public result: TestSuiteReport[] = [];

  public regenerate() {
    for (const report of this.result) {
      report.generate();
    }

    return this;
  }
}
