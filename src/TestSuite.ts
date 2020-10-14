export interface TestBlock {
  description: string;
  callback: () => void;
}; 

export type TestBlocks = TestBlock[];

export class TestSuite {
  private declareTestHelpers() {
    (global as any).it = (description, callback) => {
      this.its.push({
        description,
        callback
      });
    };

    (global as any).beforeEach = (description, callback) => {
      this.beforeEaches.push({
        description,
        callback
      });
    };

    (global as any).afterEach = (description, callback) => {
      this.afterEaches.push({
        description,
        callback
      });
    };
  }

  constructor(public testFilePath) {
    this.declareTestHelpers();

    require(testFilePath);
  }

  public describes = [];

  public beforeAlls: TestBlocks = [];
  public beforeEaches: TestBlocks = [];

  public its: TestBlocks = [];

  public afterEaches: TestBlocks = [];
  public afterAlls: TestBlocks = [];
}
