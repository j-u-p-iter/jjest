import { Trun } from "../Trun";
import { Command } from "./Command";

/**
 * This is default command. It's used to run tests.
 *
 */
export class RunCommand extends Command {
  private validOptions = ["watch"];

  private trun = new Trun();

  private runTests() {
    this.trun.run();
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

  public execute() {
    const commandOptions = this.prepareOptions(this.program, this.validOptions);

    if (commandOptions.watch) {
      /**
       * Rerun trun on change
       */
    } else {
      this.runTests();
    }
  }
}
