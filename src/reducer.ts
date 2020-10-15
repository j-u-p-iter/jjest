export const reducer = (state, action) => {
  switch (action.type) {
    case "START_DESCRIBE":
      if (state.currentDescribeBlock) {
        state.currentDescribeBlock.children.push({
          ...action.payload.describe,
          parent: state.currentDescribeBlock
        });

        state.currentDescribeBlock = action.payload.describe;
      } else {
        state.currentDescribeBlock = action.payload.describe;
        state.rootDescribeBlock = state.currentDescribeBlock;
      }
  }

  return state;
};
