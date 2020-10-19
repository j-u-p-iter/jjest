import { DescribeBlock, TestBlock, TestBlockType } from "./types";

export const isDescribeBlock = (
  testBlock: TestBlock
): testBlock is DescribeBlock => {
  return testBlock.type === TestBlockType.Describe;
};
