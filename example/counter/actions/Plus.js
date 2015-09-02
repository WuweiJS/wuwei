import { Action, Graph } from '../../../src/Wuwei'

export default class Plus extends Action {
  onFire() {
    Graph.getStore('counter').plusOne();
  }
}
