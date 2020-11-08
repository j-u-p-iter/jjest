import { Command, CommandName } from "./Command";

export class InitCommand extends Command {
  constructor(private program) {
    super();
  }

  public name = CommandName.INIT;

  public description = "Creates a default trun.json config file";

  public initialize() {
    this.program.command(this.name).description(this.description);

    return this;
  }

  public execute() {
    console.log(this.program);
  }
}
