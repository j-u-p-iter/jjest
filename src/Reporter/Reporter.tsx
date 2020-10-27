import { Tree } from "@j.u.p.iter/react-tree";
import crypto from "crypto";
import { Box, render, Text } from "ink";
import React, { useEffect, useState } from "react";
import { CombinedReport, TestSuiteReport } from "../Report";

import { Test } from "./Test";

const Report = ({ eventManager, combinedReport }) => {
  const [, rerenderComponent] = useState("");
  const [report, setReport] = useState(() => combinedReport);

  useEffect(() => {
    eventManager.on("runTestSuite", testSuite => {
      setReport(report.addReport(new TestSuiteReport(testSuite).generate()));
      rerenderComponent(crypto.randomBytes(8).toString("hex"));
    });

    eventManager.on("finishTestSuite", () => {
      setReport(report.regenerate());
      rerenderComponent(crypto.randomBytes(8).toString("hex"));
    });
  }, []);

  return (
    <Box flexDirection="column">
      <Box flexDirection="column">
        {report.result.map(({ status, testFilePath }, index) => {
          return (
            <Box>
              <Test key={index} status={status} path={testFilePath} />
            </Box>
          );
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
      </Tree>
    </Box>
  );
};

export class Reporter {
  constructor(private eventManager) {}

  init() {
    this.eventManager.on("createTestsSuites", () => {
      render(
        <Report
          eventManager={this.eventManager}
          combinedReport={new CombinedReport()}
        />
      );
    });
  }
}
