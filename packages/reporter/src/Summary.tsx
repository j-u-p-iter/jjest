import { Box, Text } from "ink";
import React, { FC } from "react";

interface SummaryProps {
  totalAmountOfTestSuites: number;
  passedAmountOfTestSuites: number;
  passedAmountOfTests: number;
  totalAmountOfTests: number;
  duration: number;
}

export const Summary: FC<SummaryProps> = ({
  totalAmountOfTestSuites,
  passedAmountOfTestSuites,
  passedAmountOfTests,
  totalAmountOfTests,
  duration
}) => {
  return (
    <Box marginTop={1} flexDirection="column">
      <Box>
        <Box marginRight={1}>
          <Text>Test Suites:</Text>
        </Box>

        {passedAmountOfTestSuites ? (
          <Box marginRight={1}>
            <Text color="green">{`${passedAmountOfTestSuites} passed,`}</Text>
          </Box>
        ) : null}

        <Box>
          <Text>{`${totalAmountOfTestSuites} total`}</Text>
        </Box>
      </Box>

      <Box>
        <Box marginRight={1}>
          <Text>Tests:</Text>
        </Box>

        {passedAmountOfTests ? (
          <Box marginRight={1}>
            <Text color="green">{`${passedAmountOfTests} passed,`}</Text>
          </Box>
        ) : null}

        <Box>
          <Text>{`${totalAmountOfTests} total`}</Text>
        </Box>
      </Box>

      <Box>
        <Box marginRight={1}>
          <Text>Duration:</Text>
        </Box>

        <Box>
          <Text>{`${duration}ms`}</Text>
        </Box>
      </Box>
    </Box>
  );
};
