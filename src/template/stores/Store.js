export default class Store extends ActiveStore {
  constructor() {
    super(...arguments)

    // this.store = set default store value.
  }

  onParentsUpdate( /* Parent store */ ) {
    // this.setStore({}) use setValue to change this store value.
  }
}
