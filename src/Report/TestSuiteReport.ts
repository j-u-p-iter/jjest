import { isDescribeBlock } from "../helpers";
import { TestSuite } from "../TestSuite";
import {
  ItBlock,
  ReportResultTree,
  TestBlock,
  TestSuiteStatus
} from "../types";
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

  private calculateDuration(items) {
    return items.reduce((resultDuration, child) => {
      if (child.children) {
        return this.calculateDuration(child.children);
      } else {
        return resultDuration + child.duration;
      }
    }, 0);
  }

  constructor(public testSuite: TestSuite) {}

  public duration: number = 0;

  public status: TestSuiteStatus = TestSuiteStatus.RUNS;

  public testFilePath: string = "";

  public numberOfTests: number = 0;

  public numberOfFailedTests: number = 0;

  public tree: ReportResultTree = {
    title: "",
    children: []
  };

  public generate(): TestSuiteReport {
    this.status = this.testSuite.status;
    this.testFilePath = this.testSuite.testFilePath;

    if (this.status === TestSuiteStatus.PASSED) {
      this.tree = this.generateReportTree([
        this.testSuite.getState().rootDescribeBlock
      ])[0];

      this.duration = this.calculateDuration(this.tree.children);
    }

    return this;
  }
}
