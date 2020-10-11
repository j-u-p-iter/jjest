const { readDir, Format } = require('@j.u.p.iter/recursive-read-dir');

class Trun {
  constructor() {
    this.files = [];
  }

  async collectFiles() {
    this.files = await readDir(
      process.cwd(), 
      { format: Format.FILES },
    );
  }

  run() {
    for (const file of this.files) {
      console.log(file);
    }
  }
}

module.exports = {
  Trun,
}
