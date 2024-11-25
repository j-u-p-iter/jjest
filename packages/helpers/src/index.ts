import {
  DescribeBlock,
  TestBlock,
  TestBlockType,
} from "@j.u.p.iter/jtrun-types";

export const isDescribeBlock = (
  testBlock: TestBlock,
): testBlock is DescribeBlock => {
  return testBlock.type === TestBlockType.DESCRIBE;
};

export const delay = (fn: () => void = () => {}, timeout: number = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });
};

export const isWindows = () => process.platform === "win32";
