import path from 'path';
import { readFileSync } from 'fs';

import { findPathToFile } from '@j.u.p.iter/find-path-to-file';

export class Config {
  /**
   * We need to find path for "tsconfig.json", that sits in the root project's folder.
   *   So, we search path for a "package.json" file at first, cause we're 100% sure,
   *   that it's located in the project's root folder.
   *   And after that we replace "package.json" with "tsconfig.json" in the path.
   *
   */
  private async getPathToRootFolder() {
    try {
      const { filePath } = await findPathToFile('package.json'); 

      return filePath.replace('package.json', '');
    } catch(error) {
      throw new Error('The project should have package.json file.')
    }
  }

  protected readFile(filePath: string): string {
    return readFileSync(filePath).toString();
  }

  /**
   * We resolve path to the config relative to the root project's folder.
   *
   */
  protected async resolvePath(pathToConfig) {
    const pathToRootFolder = await this.getPathToRootFolder();

    return path.resolve(pathToRootFolder, pathToConfig);
  }
}
