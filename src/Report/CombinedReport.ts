import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
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

  public addReport(report) {
    this.result.push(report);

    return this;
  }
}
