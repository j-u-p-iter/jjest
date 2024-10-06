type TestFn = () => void;

type BlockFn = () => void;

type HookFn = () => void;

export interface It {
  (testName: string, fn: TestFn): void;
};

export interface Describe {
  (blockName: string, fn: BlockFn): void;
}

export interface Hook {
  (fn: HookFn): void;
};
