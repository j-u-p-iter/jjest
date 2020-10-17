export const reducer = (state, action) => {
  console.log("action:", action);
  console.log("state:", state);

  switch (action.type) {
    case "START_DESCRIBE":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.children.push({
          ...action.payload.describe,
          parent: state.currentDescribeBlock
        });

        state.currentDescribeBlock = action.payload.describe;
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

    case "RUN_IT":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.children.push({
          ...action.payload.it,
          parent: state.currentDescribeBlock
        });
      } else {
        throw new Error(
          "You should put test in the describe block. Describe block is required."
        );
      }
      break;
  }

  return state;
};
