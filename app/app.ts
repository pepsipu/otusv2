// eslint-disable-next-line import/extensions
import otusBind from './native';

otusBind.test();
const x = new otusBind.SystemWatcher([{
  type: 'file_contains',
  points: 20,
  hash: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  length: 68,
  message: [1, 2, 3, 4],
  file: '/etc/passwd',
}]);
console.log(x);
