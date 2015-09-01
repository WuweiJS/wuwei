import { ActiveAction, Graph } from '../../lib/Wuwei'

export default class Plus extends ActiveAction {
  onFire() {
    console.log('ok');
    Graph.getStore('counter').plusOne();
  }
}
