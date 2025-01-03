import { Command } from "commander";

import { CommandName } from "./Command.js";
import { InitCommand } from "./InitCommand.js";
import { RunCommand } from "./RunCommand.js";

export class CLI {
  private program = new Command();

  private commands = new Map();

  private initialize() {
    this.commands.set(
      CommandName.INIT,
      new InitCommand(this.program).initialize(),
    );

    this.commands.set(
      CommandName.RUN,
      new RunCommand(this.program).initialize(),
    );
  }

  private parseArgs() {
    /**
     * Initializes INIT command.
     */
    this.program.parse(process.argv);
  }

  private execute() {
    /**
     * After we've parsed the process args, we have parsed results into the "this.program"
     *   to extract and use. In particularly we have command name and it's arguments in the "this.program.args".
     *     Boolean options are written into the "this.program" directly."
     */
    const commandName = this.program.args[0] || CommandName.RUN;

    this.commands.get(commandName).execute();
  }

  constructor() {
    /**
     * Initialzes all commands and options
     */
    this.initialize();
  }

  public run() {
    /**
     * The first funning step is to parse all information about commands names
     *   and it's arguments (from process.argv) to use them on the next (execution) step.
     */
    this.parseArgs();

    /**
     * The second running step is to execute one of the previously initialized
     *   programs.
     */
    this.execute();
  }
}
