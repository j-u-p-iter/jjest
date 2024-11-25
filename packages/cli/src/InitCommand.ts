import { Command as Program } from "commander";

import { TrunConfig } from "@j.u.p.iter/jtrun-config";

import { Command, CommandName } from "./Command.js";

export class InitCommand extends Command {
  constructor(private program: Program) {
    super();
  }

  public name = CommandName.INIT;

  public description = "Creates a default trun.json config file";

  public initialize() {
    this.program.command(this.name).description(this.description);

    return this;
  }

  public execute() {
    new TrunConfig().create();
  }
}
