import { Command as Program } from "commander";

import { Trun } from "@j.u.p.iter/jtrun-trun";
import {
  TrunConfig,
  TSConfig,
  TrunConfigOptions,
} from "@j.u.p.iter/jtrun-config";

import { Command, CommandName } from "./Command.js";

/**
 * This is default command. It's used to run tests.
 *
 */
export class RunCommand extends Command {
  private validOptions = ["watch", "config", "tsconfig"] as const;

  private trun = new Trun();

  private trunConfig: TrunConfigOptions | null = null;

  private commandOptions: any;

  private async runTests() {
    const tsConfig = await new TSConfig(this.resolveOption("tsconfig")).load();

    this.trun.run(tsConfig, this.resolveOptions());
  }

  private resolveOption(
    optionName: Exclude<(typeof this.validOptions)[number], "config">,
  ) {
    return this.commandOptions[optionName] || this.trunConfig?.[optionName];
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

  constructor(private program: Program) {
    super();
  }

  public name = CommandName.RUN;

  public initialize() {
    this.program
      .command(this.name)
      .option(
        "-w, --watch",
        "Enables watching mode (rerun tests on change the tests or the main code)",
      )
      .option(
        "-c, --config <pathToConfig>",
        "Sets up a file's path to a config",
      )
      .option(
        "-ts, --tsconfig <pathToTSConfig>",
        "Sets up a file's path to a typescript config",
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
