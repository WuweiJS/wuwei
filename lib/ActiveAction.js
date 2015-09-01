import { Graph } from '../lib/Wuwei'

export default class ActiveAction {
  constructor() {
    //
  }

  fire(params) {
    this.onFire((typeof(params) !== 'undefined') ? params : {});
  }

  // Interface
  onFire(params) {
    // Override by user.

    /*
    transaction((Graph) => {
      // Synchronous use Graph in this block only.
    })
    */
  }
}
