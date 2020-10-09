type FilePath = string;

export class Trun {
  private files: FilePath[];

  private init() {
    this.files = readDir(process.cwd()).files;
  }

  constructor() {
    init(); 
  }

  public run() {
    for (const file in files) {
      require(file);
    }
  }
}
