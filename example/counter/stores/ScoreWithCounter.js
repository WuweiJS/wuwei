import { ActiveStore } from '../../../src/Wuwei'

export default class ScoreWithCounter extends ActiveStore {
  constructor() {
    super(...arguments)

    this.value = { value: '' }
  }

  onParentsUpdate(score, counter) {
    this.setValue({
      value: `Score: ${score.value} / Counter: ${counter.value}`
    });
  }
}
