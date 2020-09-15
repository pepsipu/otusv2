// eslint-disable-next-line import/extensions
import otusBind from './native';

const x = new otusBind.SystemWatcher([{
  type: 'file_contains',
  points: 20,
  hash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const,
  length: 5,
  message: [1, 2, 3, 4],
  file: '/etc/passwd',
  nonce: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const,
  tag: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as const,
}]);
console.log(x.runChecks());
