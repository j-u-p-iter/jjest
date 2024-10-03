import { Tree as BaseTree } from "@j.u.p.iter/react-tree";
import { Box, Text } from "ink";
import React, { FC } from "react";

import { StatusIcon } from "./StatusIcon.js";

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

export const Tree: FC<any> = ({ config }) => {
  if (!config[0].title) {
    return null;
  }

  return (
    <Box marginLeft={1}>
      <BaseTree config={config}>
        {({ api: { getTree } }) => {
          const renderTree = (tree: any, level = 0) => {
            return (
              <Box flexDirection="column" marginLeft={level}>
                {tree.map((node: any, index: number) => {
                  return node.type === "describe" ? (
                    node.children ? (
                      <Box key={index} flexDirection="column">
                        <Text>{node.title}</Text>
                        <Box>{renderTree(node.children, level + 1)}</Box>
                      </Box>
                    ) : null
                  ) : (
                    <Box key={index}>
                      <Box marginRight={1}>
                        <StatusIcon status={node.status} />
                      </Box>
                      <Box marginRight={1}>
                        <Text dimColor>{node.title}</Text>
                      </Box>
                      <Text dimColor>{`(${node.duration}ms)`}</Text>
                    </Box>
                  );
                })}
              </Box>
            );
          };

          return <Box>{renderTree(getTree())}</Box>;
        }}
      </BaseTree>
    </Box>
  );
};
