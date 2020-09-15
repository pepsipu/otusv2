declare namespace otusBind {
  export class SystemWatcher {
    constructor(checks: Check[]);

    runChecks(): void;
  }
  export type Ripemd160Hash = readonly number[] & { length: 20 };
  export type AesTag = readonly number[] & { length: 16 };
  export type AesNonce = readonly number[] & { length: 12 };
  export interface Check {
    type: string,
    points: number,
    file?: string,
    hash?: Ripemd160Hash,
    length?: number,
    message?: number[],
    tag?: AesTag,
    nonce?: AesNonce,
  }
}

export = otusBind;
