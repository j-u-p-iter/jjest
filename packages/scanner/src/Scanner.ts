import { Format, readDir } from "@j.u.p.iter/recursive-read-dir";

import { TrunConfigOptions } from '@j.u.p.iter/jtrun-config';
import { EventManager } from "@j.u.p.iter/jtrun-event-manager";

import { TrunEvent } from "./types.js";

/**
 * The running tests process consists of multiple steps.
 *
 * The "Scanner" is the first step of such process.
 *
 * The purpose of this step is to find files paths for all
 *   tests files.
 *
 * The scanning process is started from the folder,
 *   the test runner ("trun") was executed in.
 *
 * A communication between different parts of running tests process
 *   happens with events. After files paths are successfully scanned
 *   "scanTestFiles" event is emitted by the Scanner to send result paths
 *   to the next step.
 *
 */

export class Scanner {
  constructor(
    private eventManager: EventManager,
    private config: Pick<
      TrunConfigOptions, 
      "dirPatternToExclude" | "filePatternToInclude"
    >
  ) {}

  public async scanTestFiles() {
    const testFiles = await readDir(process.cwd(), {
      ...this.config,
      format: Format.FILES
    });

    this.eventManager.emit(TrunEvent.SCAN_TEST_FILES, testFiles);
  }
}
