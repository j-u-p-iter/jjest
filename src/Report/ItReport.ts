import { ItBlock, ItReportError, ItStatus } from "../types";

export class ItReport {
  private generateErrorTitle(itBlock) {
    const titleParts = [itBlock.description];

    let block = itBlock;

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
    this.error = {
      title: this.generateErrorTitle(this.itBlock),
      body: this.itBlock.error
    };

    return this;
  }
}
