import { EventManager } from "./EventManager";
import { Scheduler } from "./Scheduler";
import { Reporter } from "./Reporter";
import { Runner } from "./Runner";
import { Scanner } from "./Scanner";

export class Trun {
  async run() {
    const eventManager = new EventManager();

    const runner = new Runner(eventManager);
    runner.init();

    const reporter = new Reporter(eventManager);
    reporter.init();

    const scheduler = new Scheduler(eventManager);
    await scheduler.init();

    const scanner = new Scanner(eventManager);
    await scanner.scanTestFiles();
  }
}
