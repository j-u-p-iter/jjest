export class TestSuite {
  private declareTestHelpers() {
    (global as any).it = (description, callback) => {
      this.its.push({
        description,
        callback
      });
    };

    global.beforeEach = (description, callback) => {
      this.beforeEaches.push({
        description,
        callback
      });
    };

    global.afterEach = (description, callback) => {
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

  public beforeAlls = [];
  public beforeEaches = [];

  public its: Array<{ description: string; callback: () => void }> = [];

  public afterEaches = [];
  public afterAlls = [];
}
