import { ActiveAction, Graph } from '../../../src/Wuwei'

export default class Minus extends ActiveAction {
  onFire() {
    Graph.getStore('counter').minusOne();
  }
}
