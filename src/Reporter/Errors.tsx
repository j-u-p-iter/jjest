import { Box, Text } from "ink";
import React, { FC } from "react";

interface ErrorsProps {
  errors: any;
}

export const Errors: FC<ErrorsProps> = ({ errors }) => {
  return errors.length ? (
    <Box flexDirection="column" marginTop={1}>
      <Text>Summary of all failing tests:</Text>
      {errors.map(error => {
        return (
          <Box key={error.title} flexDirection="column" marginTop={1}>
            <Box marginBottom={1} flexDirection="column">
              <Text color="red">{error.title}</Text>
              <Text dimColor>{`Error at: ${error.at}`}</Text>
              <Box>
                <Text>{`Faled expectation: ${error.error.actual} `}</Text>
                <Text>{`${error.error.operator} `}</Text>
                <Text>{error.error.expected}</Text>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  ) : null;
};
