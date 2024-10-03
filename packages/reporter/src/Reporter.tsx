import crypto from "crypto";
import { Box, render } from "ink";
import React, { useEffect, useState, FC } from "react";

import { CombinedReport, TestSuiteReport } from "@j.u.p.iter/jtrun-report";
import { TrunEvent } from "@j.u.p.iter/jtrun-types";
import { EventManager } from "@j.u.p.iter/jtrun-event-manager";

import { Errors } from "./Errors.js";
import { Summary } from "./Summary.js";
import { Test } from "./Test.js";
import { Tree } from "./Tree.js";

const Report: FC<any> = ({ eventManager, combinedReport }) => {
  const [, rerenderComponent] = useState("");
  const [report, setReport] = useState(() => combinedReport);
  const [hasRunningFinished, setHasRunningFinished] = useState(false);

  useEffect(() => {
    eventManager.on(TrunEvent.RUN_TEST_SUITE, (testSuite: any) => {
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
      {report.result.map(({ status, testFilePath, tree, duration }: any, index: any) => {
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
  constructor(private eventManager: EventManager) {}

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
