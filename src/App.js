import React, { Component } from 'react';

import Wuwei     from '../lib/Wuwei'
import { Graph, Gun } from '../lib/Wuwei'

import Counter from './stores/Counter'
import Plus    from './actions/Plus'
import Minus   from './actions/Minus'

// Define wuwei.
Wuwei.init(() => {
  Graph.setStore('counter', Counter, []);
  Gun.setAction('plus', Plus);
  Gun.setAction('minus', Minus);
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      counter: Graph.getStore('counter').subscribe((counter) => {
        this.setState({counter: counter});
      })
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
        <button onClick={this.plus} >plus</button>
        <button onClick={this.minus} >minus</button>
      </div>
    );
  }
}
