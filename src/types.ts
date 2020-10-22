export enum TestSuiteStatus {
  INACTIVE = "inactive",
  RUNS = "runs",
  PASSED = "passed",
  FAILED = "failed"
}

export enum ItStatus {
  INACTIVE = "inactive",
  RUNS = "runs",
  PASSED = "passed",
  FAILED = "failed"
}

export enum TestBlockType {
  DESCRIBE = "describe",
  IT = "it"
}

export enum TestHookType {
  BEFORE_ALL = "beforeAll",
  BEFORE_EACH = "beforeEach",
  AFTER_EACH = "afterEach",
  AFTER_ALL = "afterAll"
}

export interface TestHook {
  type: TestHookType;
  fn: () => void;
}

export interface DescribeBlock extends TestBlock {
  type: TestBlockType.DESCRIBE;
  children: TestBlock[];
  hooks: TestHook[];
}

export interface ItBlock extends TestBlock {
  type: TestBlockType.IT;
  // we render errors not only during tests execution
  // but also after all tests have run
  // so, we need to store them
  errors?: Error[];
  status: ItStatus;
}

export interface TestBlock {
  // each "it" and "describe" is nested into parent DescribeBlock
  // and is stored in it's "children" prop
  // only DescribeBlock can be a parent
  parent?: DescribeBlock;
  description: string;
  fn: () => void;
  type: TestBlockType;
}

export enum ActionType {
  START_DESCRIBE = "START_DESCRIBE",

  FINISH_DESCRIBE = "FINISH_DESCRIBE",

  RUN_IT = "RUN_IT",

  RUN_BEFORE_EACH = "RUN_BEFORE_EACH",

  RUN_AFTER_EACH = "RUN_AFTER_EACH",

  START_IT = "START_IT",

  FINISH_IT = "FINISH_IT"
}

/**
 * We need basePath and fileName to have separately to be able to add different colors.
 *
 */
export interface ReportData {
  [testSuitePath: string]: {
    status: string;
    duration: string;
    basePath: string;
    fileName: string;
    resultTree: {
      title: string;
      children?: Array<{
        title: string;
        children?: any;
      }>;
    };
  };
}
