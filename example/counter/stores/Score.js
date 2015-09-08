import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('counterApp');

export default class Score extends ActiveStore {
  onSourceUpdate(counter) {
    this.setValue({value: counter.value * 100});
  }
}
