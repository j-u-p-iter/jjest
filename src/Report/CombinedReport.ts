import { TestSuiteReport } from "./TestSuiteReport";

export class CombinedReport {
  public duration: number;

  public numberOfTests: number;

  public numberOfFailedTests: number;

  public children: TestSuiteReport[];

  public addReport(report: TestSuiteReport): void {
    this.children.push(report);
  }
}
