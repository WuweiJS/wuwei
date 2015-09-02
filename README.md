Wuwei
=====================

>無為，以時勢、趨勢的判斷做出順勢而為的行為，即順應自然的變化規律，從而達到「無為而無不為」的境界

## ActiveStore (ViewModel)

>君君，臣臣，父父，子子

<img src="http://deltastreammedia.com/mn-epub-images/ch-newfunctions1.jpg" width="300">

在 Wuwei 的設計裡，每個 Store 以『資料流』的概念設計。

一個 Store 本身，可以參照外部的 Store，作為建構這個 Store 的來源

當外部的 Store 發生變化時，會收到通知

就可以在此時重新建構這個 Store，並檢查本身有無變化（Update）

如果有，就通知使用到本身的 View，和參照到本身的其他 Store

### Stores as Graph

依照我們的方法去構築，最後所有的 Store 就會形成一個不存在 Cycle 的有向圖（Directed-Graph）

<img src="http://web.cecs.pdx.edu/~sheard/course/Cs163/Graphics/graph7.png">

(再者，如果一開始就決定了 Store Graph 的內容，就可以很簡單的在 Server Side Render 了吧？)

### Map & List

大部份的資料型態屬於這兩種，因此首先會以這兩種資料型態去實作

## Action

>無為而治

當使用者行為發生時，在 Action 裡面只要單純更新 Store 的內容就可以了，剩下的事就交給 Store 他們

### Transaction Block to Update

>這是一個理想上改善效能的方法，但尚未實作

當同一個 Action 更新多個 Store 內容時，可能會造成子節點，有被重複通知更新的情形

此時透過 Transaction Block 將資料先更新好，逐層去檢查須更新的節點

## Example

這是一個理想上的 Counter 範例

### App.js
```js
import React, { Component }  from 'react';
import Wuwei, { Graph, Gun } from '../../src/Wuwei'

import Counter          from './stores/Counter'
import Score            from './stores/Score'
import ScoreWithCounter from './stores/ScoreWithCounter'
import Plus             from './actions/Plus'
import Minus            from './actions/Minus'

// Define wuwei.
Wuwei.init(() => {
  Graph.setStore('counter', Counter, []);
  Graph.setStore('score', Score, ['counter']);
  Graph.setStore('score_with_counter', ScoreWithCounter, ['score', 'counter']);

  Gun.setAction('plus', Plus);
  Gun.setAction('minus', Minus);
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: Graph.getStore('counter')
        .subscribe(counter => { this.setState({counter: counter}) }),
      score: Graph.getStore('score')
        .subscribe(score => { this.setState({score: score}) }),
      score_with_counter: Graph.getStore('score_with_counter')
        .subscribe(score_with_counter => { this.setState({score_with_counter: score_with_counter}) })
    };
  }

  plus() {
    Gun.getAction('plus').fire();
  }

  minus() {
    Gun.getAction('minus').fire();
  }

  render() {
    return (
      <div>
        <h1>Counter.</h1>
        <h2>{this.state.counter.value}</h2>
        <h2>Score: {this.state.score.value}</h2>
        <h2>{this.state.score_with_counter.value}</h2>
        <button onClick={this.plus} >plus</button>
        <button onClick={this.minus} >minus</button>
      </div>
    );
  }
}
```
### Counter.js
```js
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
    // this.setValue({}) use setStore to change this store value.
  }
}
```
### Score.js
```js
import { ActiveStore } from '../../../src/Wuwei'

export default class Score extends ActiveStore {
  constructor() {
    super(...arguments)

    this.value = { value: 0 }
  }

  onParentsUpdate(counter ) {
    this.setValue({value: counter.value * 100});
  }
}
```
### ScoreWithCounter.js
```js
import { ActiveStore } from '../../../src/Wuwei'

export default class ScoreWithCounter extends ActiveStore {
  constructor() {
    super(...arguments)

    this.value = { value: '' }
  }

  onParentsUpdate(score, counter) {
    this.setValue({
      value: `Score: ${score.value} / Counter: ${counter.value}`
    });
  }
}
```
### Plus.js
```js
import { Action, Graph } from '../../lib/Wuwei'

export default class Plus extends Action {
  onFire() {
    Graph.getStore('counter').plusOne();
  }
}

```
### Minus.js
```js
import { Action, Graph } from '../../lib/Wuwei'

export default class Minus extends Action {
  onFire() {
    Graph.getStore('counter').minusOne();
  }
}
```
