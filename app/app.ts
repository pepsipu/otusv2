// eslint-disable-next-line import/extensions
import otusBind from './native';

const x = new otusBind.SystemWatcher([{
  type: 'file_contains',
  points: 20,
  hash: 'QUFBQUFBQUFBQUFBQUFBQUFBQUE=',
  length: 5,
  message: 'QUFBQUFBQUFBQUFBQUFBQQ==',
  file: '/etc/passwd',
  nonce: 'QUFBQUFBQUFBQUFB',
  tag: 'QUFBQUFBQUFBQUFBQUFBQQ==',
}]);
console.log(x.runChecks());
