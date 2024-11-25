#!/usr/bin/env node

import { CLI } from "./CLI.js";

const cli = new CLI();

const run = async () => {
  try {
    await cli.run();
  } catch (error) {
    console.log("Unhandled error caught:", error);
  }
};

run();
