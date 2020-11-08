#!/usr/bin/env node

import { CLI } from "./CLI";

const cli = new CLI();

const run = async () => {
  await cli.run();
};

run();
