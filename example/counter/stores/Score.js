import { ActiveStore } from '../../../src/Wuwei'

export default class Score extends ActiveStore {
  constructor() {
    super(...arguments)
  }

  onParentsUpdate(counter ) {
    this.setValue({value: counter.value * 100});
  }
}
