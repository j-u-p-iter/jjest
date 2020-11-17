import { Format, readDir } from "@j.u.p.iter/recursive-read-dir";

import { EventManager } from "./EventManager";

import { TrunEvent } from "./types";

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

interface ScannerConfig {
  dirPatternToExclude: string;
  filePatternToInclude: string;
}

export class Scanner {
  constructor(
    private eventManager: EventManager,
    private config: ScannerConfig
  ) {}

  public async scanTestFiles() {
    const testFiles = await readDir(process.cwd(), {
      ...this.config,
      format: Format.FILES
    });

    this.eventManager.emit(TrunEvent.SCAN_TEST_FILES, testFiles);
  }
}
