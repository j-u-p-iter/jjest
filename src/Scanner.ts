import { EventManager } from './EventManager';

import { readDir, Format } from '@j.u.p.iter/recursive-read-dir';

export class Scanner {
  constructor(private eventManager: EventManager) {}

  public async scanTestFiles() {
    const testFiles = await readDir(
      process.cwd(), 
      { 
        format: Format.FILES, 
        dirPatternToExclude: 'node_modules',
      },
    );

    this.eventManager.emit('scanTestFiles', testFiles);
  }
}
