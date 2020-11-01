import { ItBlock, ItReportError, ItStatus, TestBlock } from "../types";

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

  constructor(private itBlock: ItBlock) {}

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
          body: this.itBlock.error
        }
      : null;

    return this;
  }
}
