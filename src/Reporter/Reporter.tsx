import { Tree } from "@j.u.p.iter/react-tree";
import { Box, render, Text } from "ink";
import React, { useEffect, useState } from "react";

import { Test } from "./Test";

const Report = ({ eventManager }) => {
  const [testsSuites, setTestsSuites] = useState([]);

  useEffect(() => {
    eventManager.on("createTestsSuites", testsSuites => {
      setTestsSuites(testsSuites);
    });

    eventManager.on("runTestSuite", runningTestSuite => {
      setTestsSuites(
        testsSuites.map(testSuite => {
          return runningTestSuite.testFilePath === testSuite.testFilePath
            ? runningTestSuite
            : testSuite;
        })
      );
    });

    eventManager.on("finishTestSuite", runningTestSuite => {
      setTestsSuites(
        testsSuites.map(testSuite => {
          return runningTestSuite.testFilePath === testSuite.testFilePath
            ? runningTestSuite
            : testSuite;
        })
      );
    });
  }, []);

  return (
    <Box flexDirection="column">
      <Box>
        {testsSuites.map(({ testFilePath, status }) => {
          return <Test status={status} path={testFilePath} />;
        })}
      </Box>
      <Tree
        config={[
          {
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
          }
        ]}
      >
        {({ api: { getTree } }) => {
          const renderTree = (tree, level = 0) => {
            return (
              <Box flexDirection="column" marginLeft={level}>
                {tree.map(node => {
                  return node.type === "describe" ? (
                    node.children ? (
                      <Box flexDirection="column">
                        <Text>{node.title}</Text>
                        <Box>{renderTree(node.children, level + 1)}</Box>
                      </Box>
                    ) : null
                  ) : (
                    <Text>{node.title}</Text>
                  );
                })}
              </Box>
            );
          };

          return <Box>{renderTree(getTree())}</Box>;
        }}
      </Tree>
    </Box>
  );
};

export class Reporter {
  constructor(private eventManager) {}

  init() {
    render(<Report eventManager={this.eventManager} />);
  }
}
