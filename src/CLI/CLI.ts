import { Command } from 'commander';

import { RunCommand } from './RunCommand';
import { InitCommand } from './InitCommand';
import { Trun } from '../Trun';

export enum CommandName {
  RUN = 'run',
  INIT = 'init',
};

export class CLI {
  private getVersion() {
    const { version } = require('package.json');
    
    return version;
  }

  private runCommand(commandName) {
    switch(commandName) {
      case CommandName.RUN:
        new RunCommand().execute();

      case CommandName.INIT:
        new InitCommand().execute();
    }
  }

  /**
   * Run - is the default command, it executes at the end if 
   *   there is no any another method to execute.
   */
  public run() {
    /**
     * Usage of the Promise allows us to stop execution of the run method
     *   on each action of the program, that is not possible to do with simple if else.
     */
    return new Promise((resolve, reject) => {
      const program = new Command();
      
      // sets up the CLI version
      program.version(this.getVersion());
      
      program
        .command('init')  
        .description('Creates a default trun.json config file')
        .action(resolve(() => runCommand(CommandName.INIT)));
      
      program
        .option('-w, --watch', 'Enables watching mode (rerun tests on change the tests or the main code)');

      resolve(() => runCommand(CommandName.RUN));
    });
  }
} 
