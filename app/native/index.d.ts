declare namespace otusBind {
  export function test(): void;
  export class SystemWatcher {
    constructor(checks: Check[]);
  }
  export interface Check {
    type: string,
    points: number,
    file?: string,
    hash?: number[],
    length?: number,
    message?: number[],
  }
}

export = otusBind;
