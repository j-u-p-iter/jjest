import * as tsNode from "ts-node";

import { EventManager } from "./EventManager";
import { Parser } from "./Parser";
import { Reporter } from "./Reporter";
import { Runner } from "./Runner";
import { Scanner } from "./Scanner";

const eventManager = new EventManager();

export class Trun {
  private setUp(tsConfig) {
    tsNode.register(tsConfig);
  }

  private async runSequence() {
    /**
     * Contains actions,
     * according to the order we run them.
     *
     * We initialize these steps in vice versa order, cause
     * communication is going through event emitter.
     */
    const sequence = [
      /**
       * The first step is scanning folders
       * to search tests to run
       *
       */
      async () => {
        const scanner = new Scanner(eventManager);
        await scanner.scanTestFiles();
      },

      /**
       * The second step is to parse tests into more appropriate
       * structure to run
       *
       */
      async () => {
        const parser = new Parser(eventManager);
        await parser.init();
      },

      /**
       * The third step is to run tests one by one,
       * using tree from the previous step
       *
       */
      () => {
        const runner = new Runner(eventManager);
        runner.init();
      },

      /**
       * The fifth step is to report about results of running tests
       *
       */
      () => {
        const reporter = new Reporter(eventManager);
        reporter.init();
      }
    ];

    const revertedSequence = sequence.reverse();

    for (const step of revertedSequence) {
      await step();
    }
  }

  public run(tsConfig) {
    this.setUp(tsConfig);

    this.runSequence();
  }
}
