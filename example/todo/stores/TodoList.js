import Wuwei from '../../../src/Wuwei'

var { StoreSet } = Wuwei('todoApp');

export default class TodoList extends StoreSet {
  constructor() {
    super(...arguments);

    // Total size
    this.setReduceCallback(() => {
      this.setValue({itemSize: this.size()});
    });

    // Completed Size
    this.setReduceCallback(() => {
      let completedSize = 0, activeSize = 0;

      this.toArray().forEach((item) => {
        if (item.getValue().completed) {
          completedSize++;
        } else {
          activeSize++;
        }
      })

      this.setValue({
        completedSize: completedSize,
        activeSize: activeSize
      });
    });
  }

  clearCompleted() {
    this.toArray().forEach((item) => {
      if (item.getValue().completed) {
        this.delete(item);
      }
    })
  }
}
