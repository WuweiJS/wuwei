import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('counterApp');

export default class Counter extends ActiveStore {
  plusOne(){
    this.setValue({value: this.getValue().value + 1});
  }

  minusOne(){
    this.setValue({value: this.getValue().value - 1});
  }

  onSourceUpdate( /* Parent store */ ) {
    // this.setValue({}) use setValue to change this store value.
  }
}
