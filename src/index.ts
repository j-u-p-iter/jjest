#!/usr/bin/env node

const { Trun } = require("./Trun");

const trun = new Trun();

const run = async () => {
  await trun.collectFiles();

  trun.run();
};

run();
