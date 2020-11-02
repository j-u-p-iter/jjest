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
              <Text dimColor>{`Error line: ${error.at}`}</Text>
            </Box>
            <Text>{error.body.stack}</Text>
          </Box>
        );
      })}
    </Box>
  ) : null;
};
