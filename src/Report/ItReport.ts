import {
  ItBlock,
  ItReportError,
  ItStatus,
  TestBlock,
  TestSuite
} from "../types";

export class ItReport {
  private generateErrorTitle() {
    const titleParts = [this.itBlock.description];

    let block: TestBlock = this.itBlock;

    while (block.parent) {
      titleParts.push(block.parent.description);

      block = block.parent;
    }

    return titleParts.reverse().join(" * ");
  }

  private prepareAt(errorStack: string) {
    return errorStack
      .split("\n")[1]
      .match(/\(.*\)/)[0]
      .replace(/[\(,\)]/g, "");
  }

  constructor(private itBlock: ItBlock, private testSuite: TestSuite) {}

  public title: string;

  public status: ItStatus;

  public duration: number;

  public error: ItReportError;

  public generate(): ItReport {
    this.title = this.itBlock.description;
    this.status = this.itBlock.status;
    this.duration = this.itBlock.finishTime - this.itBlock.startTime;
    this.error = this.itBlock.error
      ? {
          title: this.generateErrorTitle(),
          error: this.itBlock.error,
          at: this.prepareAt(this.itBlock.error.stack),
          context: this.testSuite
        }
      : null;

    return this;
  }
}
