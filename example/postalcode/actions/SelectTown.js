import { Action, Graph } from '../../../src/Wuwei'

export default class SelectTown extends Action {
  onFire(selectedTown) {
    Graph.getStore('town').setValue({
      selected: selectedTown
    });
  }
}
