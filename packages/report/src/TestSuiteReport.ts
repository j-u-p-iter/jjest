import { isDescribeBlock } from "@j.u.p.iter/jtrun-helpers";
import { TestSuite } from "@j.u.p.iter/jtrun-test-suite";
import {
  ItBlock,
  ItReportError,
  ReportResultTree,
  TestBlock,
  TestBlockType,
  TestSuiteStatus,
} from "@j.u.p.iter/jtrun-types";
import { ItReport } from "./ItReport.js";

export class TestSuiteReport {
  private generateReportTree(testBlocks: TestBlock[]): any {
    return testBlocks.map((testBlock) => {
      if (isDescribeBlock(testBlock)) {
        return {
          title: testBlock.description,
          type: TestBlockType.DESCRIBE,
          children: this.generateReportTree(testBlock.children),
        };
      } else {
        return new ItReport(testBlock as ItBlock, this.testSuite).generate();
      }
    });
  }

  private calculateDuration(items: any) {
    return items.reduce((resultDuration: any, child: any) => {
      if (child.children) {
        return this.calculateDuration(child.children);
      } else {
        return resultDuration + child.duration;
      }
    }, 0);
  }

  private calculateAmountOfTests(items: any) {
    return items.reduce((totalAmountOfTests: any, child: any) => {
      if (child.children) {
        return this.calculateAmountOfTests(child.children);
      } else {
        return totalAmountOfTests + 1;
      }
    }, 0);
  }

  private extractErrors(items: any) {
    return items
      .reduce((testSuiteErrors: any, child: any) => {
        if (child.children) {
          return [...testSuiteErrors, ...this.extractErrors(child.children)];
        } else {
          return [...testSuiteErrors, child.error];
        }
      }, [])
      .filter(Boolean);
  }

  constructor(public testSuite: TestSuite) {}

  public duration: number = 0;

  public status: TestSuiteStatus = TestSuiteStatus.RUNS;

  public testFilePath: string = "";

  public amountOfTests: number = 0;

  public numberOfFailedTests: number = 0;

  public tree: ReportResultTree = {
    title: "",
    children: [],
  };

  public errors: ItReportError[] = [];

  public generate(): TestSuiteReport {
    this.status = this.testSuite.status;
    this.testFilePath = this.testSuite.testFilePath;

    if (
      this.status === TestSuiteStatus.PASSED ||
      this.status === TestSuiteStatus.FAILED
    ) {
      const rootTestsSuiteItem = [this.testSuite.getState().rootDescribeBlock!];

      this.tree = this.generateReportTree(rootTestsSuiteItem)[0];

      this.errors = this.extractErrors(this.tree.children);

      this.amountOfTests = this.calculateAmountOfTests(rootTestsSuiteItem);

      this.duration = this.calculateDuration(this.tree.children);
    }

    return this;
  }
}
