import { writeFileSync } from "fs";
import { Config } from "./Config.js";
import { TrunConfigOptions } from './types.js';

export class TrunConfig extends Config {
  private initialData: TrunConfigOptions = {
    dirPatternToExclude: "node_modules",
    filePatternToInclude: ".spec.ts"
  };

  private defaultName = "trunconfig.json";

  /**
   * 1. At first we try to read a config from CLI.
   *
   * 2. If there's no any config, provided by CLI, we try to find
   *   the config in the project's root folder.
   */
  private getPathToConfig() {
    if (this.pathToConfigFromCLI) {
      return this.pathToConfigFromCLI;
    }

    return this.defaultName;
  }

  constructor(private pathToConfigFromCLI?: string) {
    super();
  }

  public async load(): Promise<TrunConfigOptions> {
    const resolvedPathToConfig = await this.resolvePath(this.getPathToConfig());

    let config;

    try {
      config = JSON.parse(this.readFile(resolvedPathToConfig));
    } catch (error) {
      throw new Error(
        `An error occured while reading the configuration file: ${resolvedPathToConfig}`
      );
    }

    return config;
  }

  public async create() {
    const pathToConfig = await this.resolvePath(this.defaultName);

    writeFileSync(pathToConfig, JSON.stringify(this.initialData));
  }
}
