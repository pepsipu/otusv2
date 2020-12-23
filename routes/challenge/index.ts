import create from './create';
import submit from './submit';
import get from './get';

export default { routes: [...create.routes, ...submit.routes, ...get.routes] };
