import { Action, Graph } from '../../../src/Wuwei'

export default class Minus extends Action {
  onFire() {
    Graph.getStore('counter').minusOne();
  }
}
