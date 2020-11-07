import { Trun } from '../Trun';


export class RunCommand {
  execute() {
    const trun = new Trun();

    trun.run();
  }
}
