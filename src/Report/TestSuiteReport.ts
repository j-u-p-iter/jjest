import { isDescribeBlock } from "../helpers";
import { TestSuite } from "../TestSuite";
import { ItBlock, ReportResultTree, TestBlock } from "../types";
import { ItReport } from "./ItReport";

export class TestSuiteReport {
  private generateReportTree(testBlocks: TestBlock[]): any {
    return testBlocks.map(testBlock => {
      if (isDescribeBlock(testBlock)) {
        return {
          title: testBlock.description,
          children: this.generateReportTree(testBlock.children)
        };
      } else {
        return new ItReport(testBlock as ItBlock);
      }
    });
  }

  constructor(private testSuite: TestSuite) {}

  public duration: number = 0;

  public numberOfTests: number = 0;

  public numberOfFailedTests: number = 0;

  public tree: ReportResultTree = {
    title: "",
    children: []
  };

  public generate(): void {
    this.duration = 0;

    this.tree = this.generateReportTree([
      this.testSuite.getState().rootDescribeBlock
    ])[0];
  }
}
