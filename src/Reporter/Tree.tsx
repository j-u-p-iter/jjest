import { Tree as BaseTree } from "@j.u.p.iter/react-tree";
import { Box, Text } from "ink";
import React, { FC } from "react";

/** The config example 
 
const config = [{
    title: "super title",
    type: "describe",
    children: [
      {
        title: "one more title",
        type: "describe",
        children: [
          {
            title: "super test"
          },
          {
            title: "one more super test"
          }
        ]
      }
    ]
  }];

*/

export const Tree: FC = ({ config }) => {
  return (
    <BaseTree config={config}>
      {({ api: { getTree } }) => {
        const renderTree = (tree, level = 0) => {
          return (
            <Box flexDirection="column" marginLeft={level}>
              {tree.map(node => {
                return node.type === "describe" ? (
                  node.children ? (
                    <Box key={node.title} flexDirection="column">
                      <Text>{node.title}</Text>
                      <Box>{renderTree(node.children, level + 1)}</Box>
                    </Box>
                  ) : null
                ) : (
                  <Text key={node.title}>{node.title}</Text>
                );
              })}
            </Box>
          );
        };

        return <Box>{renderTree(getTree())}</Box>;
      }}
    </BaseTree>
  );
};
