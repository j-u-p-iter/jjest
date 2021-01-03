import { TsConfigOptions } from "ts-node";
import { readConfigFile } from "typescript";
import { Config } from "./Config";

export class TSConfig extends Config {
  private defaultName = "tsconfig.json";

  /**
   * 1. At first we try to read a path to the config from CLI.
   *
   * 2. If there's no any provided by CLI, we try to read the
   *   config by a path from the trunconfig.json
   *
   * 3. If there's no such a path in the "trunconfig.json", we try to find
   *   the "tsconfig.json" in the project's root folder.
   */
  private async getPathToConfig() {
    if (this.pathToConfigFromCLI) {
      return this.pathToConfigFromCLI;
    }

    return this.defaultName;
  }

  constructor(private pathToConfigFromCLI?: string) {
    super();
  }

  public async load(): Promise<TsConfigOptions> {
    const pathToConfig = await this.getPathToConfig();
    const resolvedPathToConfig = await this.resolvePath(pathToConfig);

    const { error, config } = readConfigFile(
      resolvedPathToConfig,
      this.readFile
    );

    if (error) {
      throw new Error(
        `An error occured while reading the configuration file: ${resolvedPathToConfig}`
      );
    }

    return config;
  }
}
