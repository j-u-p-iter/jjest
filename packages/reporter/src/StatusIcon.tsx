import { Text } from "ink";
import React, { FC } from "react";

import { isWindows } from "../constants";
import { ItStatus } from "../types";

type VisibleStatus = ItStatus.PASSED | ItStatus.FAILED;

const icons: { [key in VisibleStatus]: string } = {
  [ItStatus.PASSED]: isWindows ? "\u221A" : "\u2713",
  [ItStatus.FAILED]: isWindows ? "\u00D7" : "\u2715"
};

const colors: { [key in VisibleStatus]: string } = {
  [ItStatus.PASSED]: "green",
  [ItStatus.FAILED]: "red"
};

interface StatusIconProps {
  status: ItStatus;
}

export const StatusIcon: FC<StatusIconProps> = ({ status }) => {
  return (
    <Text color={colors[status]} paddingRight={10}>
      {icons[status]}
    </Text>
  );
};
