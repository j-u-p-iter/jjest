import { DescribeBlock, TestBlock, TestBlockType } from "./types";

export const isDescribeBlock = (
  testBlock: TestBlock
): testBlock is DescribeBlock => {
  return testBlock.type === TestBlockType.DESCRIBE;
};

export const delay = async (fn = () => {}, timeout = 500) => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });
};
