Wuwei
=====================

Wuwei is a Data-Driven Reactive Framework.

<img src="http://deltastreammedia.com/mn-epub-images/ch-newfunctions1.jpg" width="300">

# Usage

## $store, $action

You need $store and $action to use Wuwei.

### Access $store & $action
```js
import Wuwei from 'wuwei'

var { $store, $action } = Wuwei( namespace );

// @params namespace: The namespace for your App.
```
Wuwei provide namespace to seperate different App's store space.

## ActiveStore
>君君，臣臣，父父，子子

### Principle

1. Every store as instance of Store Class which extends from ActiveStore.

2. Stores maybe have other source stores to construct themself.

3. You can define logic in Store Class.

<img src="http://web.cecs.pdx.edu/~sheard/course/Cs163/Graphics/graph7.png">

### Example of Store Class

```js
import Wuwei from 'wuwei'

var { ActiveStore } = Wuwei('counterApp');

export default class Score extends ActiveStore {
  onSourceUpdate(counter) {
    this.setValue({value: counter.value * 100});
  }
}
```

In this case, Score has source store "counter", when counter's value changed, will trigger "onSourceUpdate" to update Score itself.

### onSourceUpdate( ...storeValues )

ActiveStore provide method "onSourceUpdate", you can override it to implement how to update this store when source store changed.

### Create a Store

```js
$store.create(store_name, StoreClass);

/*
@params store_name: Name of this store.
@params store_name: Object Class of this store. (extends from ActiveStore)
*/
```

```js
// Example
$store.create('score', Score);
```

### Access a Store

```js
// Example
$store.score
```

### ActiveStore Public Method

#### source( ...storeNames )

Define source stores of this store.

```js
// Example
$store.foo.source('bar1', 'bar2');
// or
$store.create('score', Score).source('counter');
```

#### getName()

Access the name of this store.

```js
// Example
$store.score.getName()
```

#### setValue( { key: value } )

Assign value to this store, store will check whether changed with immutable object comparison.

```js
// Example
$store.score.setValue({value: 100});
```

#### getValue()

Access the value of this store.
```js
// Example
$store.score.getValue();
// => {value: 100}
```

#### subscribe( callback( newValue ) )

You subscribe a store, when the store's value changed will trigger callback you assigned.

```js
// Example
$store.foo.subscribe((foo) => {
  // do something...
});
```

#### subscribe with ReactJS

If you use ReactJS, you can subscribe store to react component with follow example.

```js
// Example
this.state = {
  stateKey: $store.foo.subscribe().bind(reactComponent).state('stateKey');
}
// or
this.state = $store.subscribe({
  'stateKey1': 'foo',
  'stateKey2': 'bar'
}).bind(reactComponent)

```
## Basic Example

This is a counter app with Wuwei.

### App.js
```js
import React, { Component } from 'react';
import Wuwei from '../../src/Wuwei'

import Counter          from './stores/Counter'
import Score            from './stores/Score'

var { $store, $action } = Wuwei('counterApp');

(() => {
  // Set store & stores's path
  $store.create('counter', Counter)
  $store.create('score', Score).source('counter');

  // set store default value
  $store.counter.setValue({value: 10});
})();

export default class App extends Component {
  constructor() {
    super();

    this.state = $store.subscribe({
        'counter': 'counter',
        'score': 'score'
      }).bind(this);
  }

  plus() {
    $action.dynamic(() => {
      $store.counter.plusOne();
    });
  }

  minus() {
    $action.dynamic(() => {
      $store.counter.minusOne();
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <h2>{this.state.counter.value}</h2>
        <h2>Score: {this.state.score.value}</h2>
        <button onClick={this.plus} >plus</button>
        <button onClick={this.minus} >minus</button>
      </div>
    );
  }
}

```
### Counter.js
```js
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
```
### Score.js
```js
import Wuwei from '../../../src/Wuwei'

var { ActiveStore } = Wuwei('counterApp');

export default class Score extends ActiveStore {
  onSourceUpdate(counter) {
    this.setValue({value: counter.value * 100});
  }
}
```
