import { Router } from 'director'

import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('todoApp');

export default class SelectAllFilter extends ActiveStore {
  setOn() {
    this.setValue({
      current: true
    });
  }

  setOff() {
    this.setValue({
      current: false
    });
  }

  setSignal(act) {
    this.setValue({signal: act});
  }

  toggle() {
    this.setSignal(null);

    if (this.getValue().current) {
      this.setSignal('UNSELECT_ALL');
      this.setOff();
    } else {
      this.setSignal('SELECT_ALL');
      this.setOn();
    }
  }
}
