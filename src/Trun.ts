import { EventManager } from './EventManager';
import { Scanner } from './Scanner';
import { Reporter } from './Reporter';

export class Trun {
  async run() {
    const eventManager = new EventManager();

    const reporter = new Reporter(eventManager);
    reporter.init();

    const scanner = new Scanner(eventManager);
    await scanner.scanTestFiles();
  }
}
