import React, { FC } from "react";

import { Box, Text } from "ink";

interface ErrorsProps {
  errors: any;
}

export const Errors: FC<ErrorsProps> = ({ errors }) => {
  return (
    <Box flexDirection="column">
      {errors.map(error => {
        return <Text key={error.title}>{error.title}</Text>;
      })}
    </Box>
  );
};
