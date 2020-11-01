import React, { FC } from "react";

import { Box, Text } from "ink";

interface ErrorsProps {
  errors: any;
}

export const Errors: FC<ErrorsProps> = ({ errors }) => {
  return (
    <Box flexDirection="column">
      {errors.map(error => {
        return (
          <Box key={error.title}>
            <Text>{error.title}</Text>
            <Text>{error.body.message}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
