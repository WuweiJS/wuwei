import { ActiveAction, Graph } from '../../../src/Wuwei'

export default class Plus extends ActiveAction {
  onFire() {
    Graph.getStore('counter').plusOne();
  }
}
