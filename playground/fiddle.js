import Wuwei from '../src/refactor/Wuwei'

import ActiveStore   from '../src/refactor/ActiveStore'
import StoreSet      from '../src/refactor/StoreSet'
import StoreMultiSet from '../src/refactor/StoreMultiSet'

var { $store, $action } = Wuwei('mynamespace');

class Count extends ActiveStore {
  onSourceUpdate() {
    //
  }
}

class Score extends ActiveStore {
  onSourceUpdate(count) {
    this.setValue({value: count.value * 200})
  }
}

class Post extends ActiveStore {
  onSourceUpdate(count) {
    //
  }
}

class Like extends ActiveStore {
  onSourceUpdate(count) {
    //
  }
}

class Comment extends ActiveStore {
  onSourceUpdate(count) {
    //
  }
}

$store.create('count', Count)

$store.create('score', Score).source('count');

$store.count.subscribe((count) => { console.log(`Count: ${count.value}`) })

$store.score.subscribe((score) => { console.log(`Score: ${score.value}`) })

$store.count.setValue({value: 1});

$store.count.setValue({value: 2});


$store.createSet('post_list', Post).itemSource('count');

$store.createSet('like_list', Like).itemBelongsTo('post_list').itemSource('count');

$store.createMultiSet('comment_list_set', Comment)
  .setBelongsTo('post_list').itemSource('count').onSetCreate((set) => {
    set.add();
    set.add();
    set.add();
    set.add();
    set.add();
    set.add();
    set.add();
    set.add();
    set.add();
  })

$store.post_list.add().setValue({content: '12345'});

$store.post_list.add().setValue({content: '123456'});

$store.post_list.add().setValue({content: '1234567'});

$store.post_list.add().setValue({content: '12345678'});

console.log($store.post_list.size());

console.log($store.like_list.size());

console.log($store.comment_list_set.size());

console.log($store.comment_list_set.eachSize());
