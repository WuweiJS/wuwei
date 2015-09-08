import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('postalcodeApp');

export default class County extends ActiveStore {
  onSourceUpdate(dataSource) {
    let list = [];

    for (let county in dataSource) {
      list.push(county);
    }

    this.setValue({list: list});
  }
}
