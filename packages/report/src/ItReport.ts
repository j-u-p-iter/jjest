import {
  ItBlock,
  ItReportError,
  ItStatus,
  TestBlock,
} from "@j.u.p.iter/jtrun-types";
import { TestSuite } from "@j.u.p.iter/jtrun-test-suite";

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
      .split("\n")[1]!
      .match(/\(.*\)/)![0]
      .replace(/[(,)]/g, "");
  }

  constructor(
    private itBlock: ItBlock,
    private testSuite: TestSuite,
  ) {}

  public title: string = "";

  public status: ItStatus = ItStatus.INACTIVE;

  public duration: number = 0;

  public error: ItReportError = null;

  public generate(): ItReport {
    this.title = this.itBlock.description;
    this.status = this.itBlock.status;
    this.duration =
      this.itBlock.finishTime && this.itBlock.startTime
        ? this.itBlock.finishTime - this.itBlock.startTime
        : 0;
    this.error = this.itBlock.error
      ? {
          title: this.generateErrorTitle(),
          error: this.itBlock.error,
          at: this.prepareAt(this.itBlock.error.stack!),
          context: this.testSuite,
        }
      : null;

    return this;
  }
}
