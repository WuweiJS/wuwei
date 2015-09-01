import { ActiveAction } from '../../lib/Wuwei'

export default class Action extends ActiveAction {
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
