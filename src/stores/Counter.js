import { ActiveStore } from '../../lib/Wuwei'

export default class Counter extends ActiveStore {
  constructor() {
    super(...arguments)

    this.value = { value: 10 }
  }

  plusOne(){
    this.setValue({value: this.getValue().value + 1});
  }

  minusOne(){
    this.setValue({value: this.getValue().value - 1});
  }

  onParentsUpdate( /* Parent store */ ) {
    // this.setStore({}) use setStore to change this store value.
  }
}
