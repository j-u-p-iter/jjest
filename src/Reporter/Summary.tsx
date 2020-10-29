import { Box, Text } from "ink";
import React, { FC } from "react";

interface SummaryProps {
  totalAmountOfTestSuites: number;
  passedAmountOfTestSuites: number;
}

export const Summary: FC<SummaryProps> = ({
  totalAmountOfTestSuites,
  passedAmountOfTestSuites
}) => {
  return (
    <Box marginTop={1}>
      <Box>
        <Box marginRight={1}>
          <Text>Test Suites:</Text>
        </Box>

        <Box marginRight={1}>
          <Text color="green">{`${passedAmountOfTestSuites} passed,`}</Text>
        </Box>

        <Box>
          <Text>{`${totalAmountOfTestSuites} total`}</Text>
        </Box>
      </Box>
    </Box>
  );
};
