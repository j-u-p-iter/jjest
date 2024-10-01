import { DescribeBlock } from "@j.u.p.iter/jtrun-types";

export interface StoreState {
  currentDescribeBlock: DescribeBlock | null;
  rootDescribeBlock: DescribeBlock | null;
};
