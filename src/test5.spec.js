const assert = require("assert");

describe("super test", () => {
  describe("by some condition", () => {
    describe("new describe", () => {
      it("works properly", () => {
        console.log("hello5");
        assert.equal(5, 1);
      });
    });
  });
});
