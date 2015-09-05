import { ActiveStore } from '../../../src/Wuwei'

export default class County extends ActiveStore {
  constructor() {
    super(...arguments)
  }

  onParentsUpdate(dataSource) {
    let list = [];

    for (let county in dataSource) {
      list.push(county);
    }

    this.setValue({list: list});
  }
}
