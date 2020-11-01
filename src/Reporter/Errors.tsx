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
          <Box key={error.title} flexDirection="column">
            <Text>{error.title}</Text>
            <Text>{error.body.stack}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
