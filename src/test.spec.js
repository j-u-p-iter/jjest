const assert = require('assert');

describe('super test', () => {
  let result;
  describe('by some condition', () => {
    beforeEach(() => {
      result = 5; 
    });

    it('works properly', () => {
      assert.equal(result, 5) 
    });

    afterEach(() => {
      result = 10; 
    });
  });

  describe('another describe block', () => {
    it('works properly too', () => {
      assert.equal(result, 8);
    });
  });
});
