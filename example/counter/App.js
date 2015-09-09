import React, { Component } from 'react';
import Wuwei from '../../src/Wuwei'

import Counter          from './stores/Counter'
import Score            from './stores/Score'

var { $store, $action } = Wuwei('counterApp');

// Set store & stores's path
$store.create('counter', Counter)
$store.create('score', Score).source('counter');

// set store default value
$store.counter.setValue({value: 10});

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
