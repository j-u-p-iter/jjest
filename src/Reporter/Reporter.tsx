import React, { useEffect, useState } from 'react';
import { render, Box } from 'ink';

import { Test } from './Test';

const Report = ({ eventManager }) => {
  const [testsSuites, setTestsSuites] = useState([]); 

  useEffect(() => {
    eventManager.on('createTestsSuites', (testsSuites) => {
      setTestsSuites(testsSuites); 
    });

    eventManager.on('runTestSuite', (runningTestSuite) => {
      setTestsSuites(testsSuites.map((testSuite) => {
        return runningTestSuite.testFilePath === testSuite.testFilePath ? runningTestSuite : testSuite; 
      })); 
    });

    eventManager.on('finishTestSuite', (runningTestSuite) => {
      setTestsSuites(testsSuites.map((testSuite) => {
        return runningTestSuite.testFilePath === testSuite.testFilePath ? runningTestSuite : testSuite; 
      })); 
    });
  }, []);

  return (
    <Box flexDirection="column">
      {testsSuites.map(({ testFilePath, status }) => {
        return (
          <Test status={status} path={testFilePath} />
        );
      })}
    </Box>
  );
};

export class Reporter {
  constructor(private eventManager) {} 

  init() {
    render(
      <Report eventManager={this.eventManager} />
    );
  }
}
