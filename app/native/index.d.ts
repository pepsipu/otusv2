declare namespace otusBind {
  export class SystemWatcher {
    constructor(checks: Check[]);

    runChecks(): (string | number)[][];
  }
  export type Ripemd160Hash = string;
  export type AesTag = string;
  export type AesNonce = string;
  export interface Check {
    type: string,
    points: number,
    file?: string,
    hash?: Ripemd160Hash,
    length?: number,
    message?: string,
    tag?: AesTag,
    nonce?: AesNonce,
  }
}

export = otusBind;
