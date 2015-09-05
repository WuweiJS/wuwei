import { Action, Graph } from '../../../src/Wuwei'

export default class SelectCounty extends Action {
  onFire(selectedCounty) {
    Graph.getStore('county').setValue({
      selected: selectedCounty
    });
  }
}
