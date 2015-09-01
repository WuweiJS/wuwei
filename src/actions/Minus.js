import { ActiveAction, Graph } from '../../lib/Wuwei'

export default class Minus extends ActiveAction {
  onFire() {
    console.log('ok');
    Graph.getStore('counter').minusOne();
  }
}
