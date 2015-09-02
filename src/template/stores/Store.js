export default class Store extends ActiveStore {
  constructor() {
    super(...arguments)

    // this.store = set default store value.
  }

  onParentsUpdate( /* Parent store */ ) {
    // this.setStore({}) use setStore to change this store value.
  }
}
