import { Router } from 'director'

import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('todoApp');

export default class ShowingFilter extends ActiveStore {
  bindRoutes() {
    var router = Router({
    	'/': () => { this.showAll() },
    	'/active': () => { this.showActive() },
    	'/completed': () => { this.showCompleted() }
    });
    router.init('/');
  }

  showAll() {
    this.setValue({current: 'ALL'});
  }

  showActive() {
    this.setValue({current: 'ACTIVE'});
  }

  showCompleted() {
    this.setValue({current: 'COMPLETED'});
  }

  isAll() {
    return this.getValue().current == 'ALL';
  }

  isActive() {
    return this.getValue().current == 'ACTIVE';
  }

  isCompleted() {
    return this.getValue().current == 'COMPLETED';
  }

  onSourceUpdate() {

  }
}
