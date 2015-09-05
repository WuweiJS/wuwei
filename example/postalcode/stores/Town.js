import { ActiveStore } from '../../../src/Wuwei'

export default class Town extends ActiveStore {
  constructor() {
    super(...arguments)
  }

  onParentsUpdate(dataSource, county) {
    let list = [];

    if (county.selected) {
      for (let town in dataSource[county.selected]) {
        list.push(town);
      }
    }

    this.setValue({
      selected: null,
      list: list,
      codeTable: dataSource[county.selected]
    });
  }
}
