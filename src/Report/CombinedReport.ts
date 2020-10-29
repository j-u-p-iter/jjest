import { TestSuiteStatus } from "../types";
import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
  public duration: number;

  public numberOfTests: number;

  public numberOfFailedTests: number;

  public result: TestSuiteReport[] = [];

  public summary() {
    return {
      totalAmountOfTestSuites: this.result.length,
      passedAmountOfTestSuites: this.result.filter(({ status }) => {
        return Object.is(status, TestSuiteStatus.PASSED);
      }).length
    };
  }

  public regenerate() {
    for (const report of this.result) {
      report.generate();
    }

    return this;
  }

  public addReport(report) {
    this.result.push(report);

    return this;
  }
}
