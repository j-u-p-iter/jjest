import { EventManager } from "./EventManager";

import { Format, readDir } from "@j.u.p.iter/recursive-read-dir";

export class Scanner {
  constructor(private eventManager: EventManager) {}

  public async scanTestFiles() {
    const testFiles = await readDir(process.cwd(), {
      format: Format.FILES,
      dirPatternToExclude: "node_modules",
      filePatternToInclude: ".spec.js"
    });

    this.eventManager.emit("scanTestFiles", testFiles);
  }
}
