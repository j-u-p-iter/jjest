import { Box, Text } from "ink";
import React, { FC } from "react";

import { TestSuiteStatus } from "../types";

const getBackgroundForStatus = (status: TestSuiteStatus) => {
  switch (status) {
    case TestSuiteStatus.RUNS:
      return "yellow";

    case TestSuiteStatus.PASSED:
      return "green";

    case TestSuiteStatus.FAILED:
      return "red";

    default:
      return "red";
  }
};

interface TestPathProps {
  path: string;
}

const TestPath: FC<TestPathProps> = ({ path }) => {
  const [fileName, ...basePathItems] = path.split("/").reverse();
  const basePath = `${basePathItems.reverse().join("/")}/`;

  return (
    <Box marginRight={1}>
      <Text dimColor>{basePath}</Text>
      <Text>{fileName}</Text>
    </Box>
  );
};

interface TestProps {
  status: TestSuiteStatus;
  path: string;
  duration: number;
}

export const Test: FC<TestProps> = ({ status, path, duration }) => {
  return (
    <Box>
      <Text color="black" backgroundColor={getBackgroundForStatus(status)}>
        {status.toUpperCase()}
      </Text>

      <TestPath path={path} />

      <Box marginLeft={1}>
        <Text>{`(${duration}ms)`}</Text>
      </Box>
    </Box>
  );
};
