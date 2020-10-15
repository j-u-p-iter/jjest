export enum TestBlockType {
  Describe = "describe",
  It = "it"
}

export enum TestHookType {
  BeforeAll = "beforeAll",
  BeforeEach = "beforeEach",
  AfterEach = "afterEach",
  AfterAll = "afterAll"
}

export interface TestHook {
  type: TestHookType;
  fn: () => void;
}

export interface DescribeBlock extends TestBlock {
  type: TestBlockType.Describe;
  children: TestBlock[];
  hooks: TestHook[];
}

export interface ItBlock extends TestBlock {
  type: TestBlockType.It;
  // we render errors not only during tests execution
  // but also after all tests have run
  // so, we need to store them
  errors: Error[];
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
