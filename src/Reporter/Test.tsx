import React from 'react';
import { Box, Text } from 'ink';

import { TestSuiteStatus } from '../types';

const getBackgroundForStatus = (status: TestSuiteStatus) => {
  switch(status) {
    case TestSuiteStatus.RUNS:
      return 'yellow';

    case TestSuiteStatus.PASSED:
      return 'green';

    case TestSuiteStatus.FAILED:
      return 'red';

    default:
      return 'red';
  }
}

export const Test = ({ status, path }) => {
  return (
    <Box>
      <Text color='black' backgroundColor={getBackgroundForStatus(status)}>
        {status.toUpperCase()}
      </Text>

      <Box marginLeft={1}> 
        <Text>{path}</Text> 
      </Box>
    </Box>
  );
}
