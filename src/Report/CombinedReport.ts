import { TestSuiteStatus } from "../types";
import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
  public result: TestSuiteReport[] = [];

  public summary() {
    return {
      totalAmountOfTestSuites: this.result.length,
      passedAmountOfTestSuites: this.result.filter(({ status }) => {
        return Object.is(status, TestSuiteStatus.PASSED);
      }).length,
      duration: this.result.reduce((totalDuration, { duration }) => {
        return totalDuration + duration;
      }, 0),
      totalAmountOfTests: this.result.reduce(
        (totalAmountOfTests, { amountOfTests }) => {
          return totalAmountOfTests + amountOfTests;
        },
        0
      ),
      errors: this.result.reduce((resultErrors, { errors: reportErrors }) => {
        return [...resultErrors, ...reportErrors];
      }, [])
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
