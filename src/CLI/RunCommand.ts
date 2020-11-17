import { Trun } from "../Trun";
import { Command } from "./Command";

import { TrunConfig, TSConfig } from "../Config";

/**
 * This is default command. It's used to run tests.
 *
 */
export class RunCommand extends Command {
  private validOptions = ["watch", "config", "tsconfig"];

  private trun = new Trun();

  private trunConfig;

  private commandOptions;

  private async runTests() {
    const tsConfig = await new TSConfig(this.resolveOption("tsconfig")).load();

    this.trun.run(tsConfig, this.resolveOptions());
  }

  private resolveOption(optionName) {
    return this.commandOptions[optionName] || this.trunConfig[optionName];
  }

  private resolveOptions() {
    return { ...this.trunConfig, ...this.commandOptions };
  }

  private readCommandOptions() {
    this.commandOptions = this.prepareOptions(this.program, this.validOptions);
  }

  private async readConfig() {
    this.trunConfig = await new TrunConfig(this.commandOptions.config).load();
  }

  constructor(private program) {
    super();
  }

  public initialize() {
    this.program
      .option(
        "-w, --watch",
        "Enables watching mode (rerun tests on change the tests or the main code)"
      )
      .option(
        "-c, --config <pathToConfig>",
        "Sets up a file's path to a config"
      )
      .option(
        "-ts, --tsconfig <pathToTSConfig>",
        "Sets up a file's path to a typescript config"
      );

    return this;
  }

  public async execute() {
    /**
     * Options can be passed:
     *
     * 1. With CLI.
     * 2. Set up in the config.
     *
     */
    this.readCommandOptions();
    await this.readConfig();

    if (this.resolveOption("watch")) {
      /**
       * Rerun trun on file changes
       */
    } else {
      this.runTests();
    }
  }
}
