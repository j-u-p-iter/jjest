export enum CommandName {
  RUN = "run",
  INIT = "init"
}

export class Command {
  public prepareOptions(originalOptions, validOptions): { [key: string]: any } {
    return Object.entries(originalOptions).reduce(
      (resultOptions, [optionName, optionValue]) => {
        if (validOptions.includes(optionName)) {
          resultOptions[optionName] = optionValue;
        }

        return resultOptions;
      },
      {}
    );
  }
}
