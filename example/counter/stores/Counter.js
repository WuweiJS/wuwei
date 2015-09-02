import { ActiveStore } from '../../../src/Wuwei'

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
    // this.setValue({}) use setValue to change this store value.
  }
}
