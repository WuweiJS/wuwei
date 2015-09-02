import { Graph } from './Wuwei'

export default class Action {
  constructor() {
    //
  }

  fire(params) {
    this.onFire((typeof(params) !== 'undefined') ? params : {});
  }

  // Interface
  onFire(params) {
    // Override by user.

  /**
   * transaction((Graph) => {
   *   // Synchronous use Graph in this block only.
   * })
   */
  }
}