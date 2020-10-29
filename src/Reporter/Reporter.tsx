import crypto from "crypto";
import { Box, render } from "ink";
import React, { useEffect, useState } from "react";
import { CombinedReport, TestSuiteReport } from "../Report";

import { Summary } from "./Summary";
import { Test } from "./Test";
import { Tree } from "./Tree";

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
      {report.result.map(({ status, testFilePath, tree, duration }, index) => {
        return (
          <Box key={index} flexDirection="column">
            <Test status={status} path={testFilePath} duration={duration} />
            <Tree config={[tree]} />
          </Box>
        );
      })}
      <Summary {...report.summary()} />
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
