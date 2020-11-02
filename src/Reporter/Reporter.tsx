import crypto from "crypto";
import { Box, render } from "ink";
import React, { useEffect, useState } from "react";
import { CombinedReport, TestSuiteReport } from "../Report";
import { TrunEvent } from "../types";

import { Errors } from "./Errors";
import { Summary } from "./Summary";
import { Test } from "./Test";
import { Tree } from "./Tree";

const Report = ({ eventManager, combinedReport }) => {
  const [, rerenderComponent] = useState("");
  const [report, setReport] = useState(() => combinedReport);
  const [hasRunningFinished, setHasRunningFinished] = useState(false);

  useEffect(() => {
    eventManager.on(TrunEvent.RUN_TEST_SUITE, testSuite => {
      setReport(report.addReport(new TestSuiteReport(testSuite).generate()));
      rerenderComponent(crypto.randomBytes(8).toString("hex"));
    });

    eventManager.on(TrunEvent.FINISH_TEST_SUITE, () => {
      setReport(report.regenerate());
      rerenderComponent(crypto.randomBytes(8).toString("hex"));
    });

    eventManager.on(TrunEvent.FINISH_RUNNING_TESTS, () => {
      setHasRunningFinished(true);
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

      {hasRunningFinished ? <Errors errors={report.summary().errors} /> : null}
    </Box>
  );
};

export class Reporter {
  constructor(private eventManager) {}

  init() {
    this.eventManager.on(TrunEvent.PARSE_TESTS_SUITES, () => {
      render(
        <Report
          eventManager={this.eventManager}
          combinedReport={new CombinedReport()}
        />
      );
    });
  }
}
