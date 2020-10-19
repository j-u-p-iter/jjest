export const reducer = (state, action) => {
  switch (action.type) {
    case "START_DESCRIBE":
      const newDescribeBlock = {
        ...action.payload.describe,
        parent: state.currentDescribeBlock
      };

      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.children.push(newDescribeBlock);

        state.currentDescribeBlock = newDescribeBlock;
      } else {
        /**
         * We use currentDescribeBlock to change describe block
         * on any level inside of the rootDescribeBlock.
         *
         * It's possible, because objects are changed by the reference.
         */

        state.currentDescribeBlock = action.payload.describe;

        /**
         * We touch the rootDescribeBlock only one time here.
         * We need it to store the top (root) describe block.
         */
        state.rootDescribeBlock = state.currentDescribeBlock;
      }
      break;

    case "FINISH_DESCRIBE":
      if (state.currentDescribeBlock.parent) {
        state.currentDescribeBlock = state.currentDescribeBlock.parent;
      } else {
        state.currentDescribeBlock = null;
      }

      break;

    case "RUN_IT":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.children.push({
          ...action.payload.it,
          parent: state.currentDescribeBlock
        });
      } else {
        throw new Error(
          "You should wrap the it with the describe block. Describe block is required."
        );
      }
      break;

    case "RUN_BEFORE_EACH":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.hooks.push(action.payload.beforeEach);
      } else {
        throw new Error(
          "You should wrap the beforeEach block with the describe block. Describe block is required."
        );
      }
      break;

    case "RUN_AFTER_EACH":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.hooks.push(action.payload.afterEach);
      } else {
        throw new Error(
          "You should wrap the afterEach block with the describe block. Describe block is required."
        );
      }
      break;
  }

  return state;
};
