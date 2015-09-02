import React, { Component } from 'react';
import Wuwei, { Graph, Gun }     from '../../src/Wuwei'

import Counter          from './stores/Counter'
import Score            from './stores/Score'
import ScoreWithCounter from './stores/ScoreWithCounter'
import Plus    from './actions/Plus'
import Minus   from './actions/Minus'

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
