import { Text } from "ink";
import React, { FC } from "react";

import { isWindows as isWindowsFn } from "@j.u.p.iter/jtrun-helpers";
import { ItStatus } from "@j.u.p.iter/jtrun-types";

type VisibleStatus = ItStatus.PASSED | ItStatus.FAILED;

const isWindows = isWindowsFn();

const icons: { [key in VisibleStatus]: string } = {
  [ItStatus.PASSED]: isWindows ? "\u221A" : "\u2713",
  [ItStatus.FAILED]: isWindows ? "\u00D7" : "\u2715",
};

const colors: { [key in VisibleStatus]: string } = {
  [ItStatus.PASSED]: "green",
  [ItStatus.FAILED]: "red",
};

interface StatusIconProps {
  status: VisibleStatus;
}

export const StatusIcon: FC<StatusIconProps> = ({ status }) => {
  return <Text color={colors[status]}>{icons[status]}</Text>;
};
