import { EventManager } from "./EventManager";
import { Queue } from "./Queue";
import { Reporter } from "./Reporter";
import { Scanner } from "./Scanner";

export class Trun {
  async run() {
    const eventManager = new EventManager();

    const reporter = new Reporter(eventManager);
    reporter.init();

    const queue = new Queue(eventManager);
    await queue.init();

    const scanner = new Scanner(eventManager);
    await scanner.scanTestFiles();
  }
}
