Wuwei
=====================

Wuwei is a Data-Driven Reactive Framework.

<img src="http://deltastreammedia.com/mn-epub-images/ch-newfunctions1.jpg" width="300">

Wuwei is inspired from [Incremental computing](https://en.wikipedia.org/wiki/Incremental_computing)

Incremental computing is a software feature which, whenever a piece of data changes, attempts to save time by only recomputing those outputs which "depend on" the changed data.

So we can assume store as self-adjusting model, and each store has dependency, will organize [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) finally.

# Usage

## $store, $action

You need $store and $action to use Wuwei.

### Access $store & $action
```js
import Wuwei from 'wuwei'

var { $store, $action } = Wuwei( namespace );

// @params namespace: The namespace for your App.
```
Wuwei provide namespace to separate different App's store space.

## ActiveStore
>君君，臣臣，父父，子子

### Principle

1. Every store is an instance of `Store Class` which extends from `ActiveStore`.

2. A Store maybe has other `Source store` to construct itself.

3. You can define logic about each store in your `Store Class`.

<img src="http://web.cecs.pdx.edu/~sheard/course/Cs163/Graphics/graph7.png">

### Example of a Store Class

```js
import Wuwei from 'wuwei'

var { ActiveStore } = Wuwei('counterApp');

export default class Score extends ActiveStore {
  onSourceUpdate(counter) {
    this.setValue({value: counter.value * 100});
  }
}
```

In this case, Score (`Store Class`) has source store "counter", when counter's value changed, will trigger Score's method "onSourceUpdate" to update Score itself.

### onSourceUpdate( ...storeValues )

ActiveStore provide method "onSourceUpdate", you can override it to implement how to update this store when `Source store` changed.

### Create a Store

```js
$store.create(storeName, StoreClass);

/*
@params storeName: Name of this store instance.
@params StoreClass: Object Class of this store. (extends from ActiveStore)
*/
```

```js
// Example
$store.create('score', Score);
```

### Access a Store

You can access store you defined from $store directly.

```js
// Example
$store.score
```

### ActiveStore Public Method

#### source( ...storeNames )

Define `source stores` of this store.

```js
// Example
$store.foo.source('bar1', 'bar2');
// or
$store.create('score', Score).source('counter');
```

#### getName()

Access the name of this store. sometimes you need it to recognize different stores.

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

You can subscribe a store's value, when the store's value changed will trigger callback you assigned.

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

Demo: http://wuweijs.github.io/wuwei/

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
## StoreSet (Abstract Data Type)

Help you manipulate dynamic store collection, such as list.

### Principle

1. Set is a collection of stores.
2. Those stores are same `Store Class`.
3. Set has its own value, the value can calculate from its items (use "addUpdateListener").
4. Set can be a set which map from another set.

### Create a Set

```js
$store.createSet(setName, setClass)

/*
@params setName: Name of this store.
@params setClass: Object Class of this set. (extends from StoreSet)
*/
```

```js
// Example
$store.create('todoList', TodoList);
```

### Access a Set

```js
// Example
$store.todoList
```

### Assign Store Class for item of this set.

```js
// Example
$store.createSet('todoList', TodoList)
      .itemClass(TodoItem)
```

### Assign source store for each item of set.

```js
// Example
$store.createSet('todoList', TodoList)
      .itemClass(TodoItem)
      .itemSource('selectAllFilter')
```

### Example of Set

```js
import Wuwei from 'wuwei'

var { StoreSet } = Wuwei('todoApp');

export default class TodoList extends StoreSet {
  constructor() {
    super(...arguments);

    // Total size
    this.addUpdateListener(() => {
      this.setValue({itemSize: this.size()});
    });
  }
}
```
In this case we can use method "addUpdateListener", assign our customized callback to calculate update TodoList's value "itemSize" when items changed (Add, Delete, or any item Update)

### addUpdateListener( callback )

StoreSet provide method "addUpdateListener",
you can use it to assign callback to update value which subscribed by other View component.

### StoreSet Public Method

#### getName()
#### setValue( { key: value } )
#### getValue()
#### subscribe( callback( newValue ) )

The usage is same as ActiveStore.

#### itemClass( storeClass )

Define item's `Store Class` in this set.

#### itemSource( ...storeName )

Assign extra `source store` for each item.

#### add()

Will return new item created in this set.

#### delete( storeItem )

Delete item in this set.

#### toArray()

Transform set to array.

#### at( index )

Access item with index.

#### deleteAt( index )

Delete item with index.

#### itemMapFrom( setName )

In some situations, the set is a set map from another set.

You can use this method define `target set` which this set map from.

When `target set` add item will automatic generate mapped item in this set.

And the first source parameter of mapped items will be the store they map from.

## TodoMVC example

http://wuweijs.github.io/wuwei-todo/
