import { Trun } from "../Trun";
import { Command } from "./Command";

import { TSConfig, TrunConfig } from '../Config';

/**
 * This is default command. It's used to run tests.
 */
export class RunCommand extends Command {
  private validOptions = ["watch"];

  private trun = new Trun();

  private trunConfig;

  private async runTests() {
    const tsConfig = await new TSConfig().load();

    this.trun.run(tsConfig);
  }

  constructor(private program) {
    super();
  }

  public initialize() {
    this.program.option(
      "--watch",
      "Enables watching mode (rerun tests on change the tests or the main code)"
    );

    return this;
  }

  public async execute() {
    const commandOptions = this.prepareOptions(this.program, this.validOptions);

    this.trunConfig = await new TrunConfig().load();

    if (commandOptions.watch || this.trunConfig.watch) {
      /**
       * Rerun trun on change
       */
    } else {
      this.runTests();
    }
  }
}
