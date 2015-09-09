import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('todoApp');

export default class TodoItem extends ActiveStore {

  setCompleted() {
    this.setValue({completed: true});
  }

  setActive() {
    this.setValue({completed: false});
  }

  isActive() {
    return !this.getValue().completed;
  }

  isCompleted() {
    return this.getValue().completed;
  }

  onSourceUpdate(selectAllFilter) {
    if (selectAllFilter.signal) {
      if (selectAllFilter.signal == 'SELECT_ALL') {
        this.setCompleted();
      }
      if (selectAllFilter.signal == 'UNSELECT_ALL') {
        this.setActive();
      }
    }
  }
}
