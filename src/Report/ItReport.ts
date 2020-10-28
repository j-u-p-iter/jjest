import { ItBlock, ItStatus } from "../types";

export class ItReport {
  constructor(private itBlock: ItBlock) {}

  public title: string;

  public status: ItStatus;

  public duration: number;

  public generate(): ItReport {
    this.title = this.itBlock.description;
    this.status = this.itBlock.status;
    this.duration = this.itBlock.finishTime - this.itBlock.startTime;

    return this;
  }
}
