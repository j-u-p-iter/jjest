import { EventManager } from '@j.u.p.iter/jtrun-event-manager';
import { Scanner } from '@j.u.p.iter/jtrun-scanner';

const scanner = new Scanner(
  new EventManager(), 
  {
    dirPatternToExclude: 'node_modules',
    filePatternToInclude: '.spec.ts'
  }
);

scanner.scanTestFiles();
