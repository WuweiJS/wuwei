import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('postalcodeApp');

export default class Town extends ActiveStore {
  onSourceUpdate(dataSource, county) {
    let list = [];

    if (county.selected) {
      for (let town in dataSource[county.selected]) {
        list.push(town);
      }
    }

    this.setValue({
      list: list,
      selected: null,
      codeTable: dataSource[county.selected]
    });
  }
}
