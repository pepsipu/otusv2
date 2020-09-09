import otus = require('.');

declare namespace otusBind {
  export function test(): void;
  export class SystemWatcher {}
}

export = otusBind;
