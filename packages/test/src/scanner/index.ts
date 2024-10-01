import { EventManager } from '@j.u.p.iter/jtrun-event-manager';
import { Scanner } from '@j.u.p.iter/jtrun-scanner';
import { TrunEvent } from '@j.u.p.iter/jtrun-types';

const eventManager = new EventManager();

const scanner = new Scanner(
  eventManager, 
  {
    dirPatternToExclude: 'node_modules',
    filePatternToInclude: '.spec.ts'
  }
);

eventManager.on(TrunEvent.SCAN_TEST_FILES, (data) => {
  console.log("data", data);
});

scanner.scanTestFiles();
