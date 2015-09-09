import React, { Component } from 'react';
import Wuwei from '../../../src/Wuwei'

var { $store, $action } = Wuwei('todoApp');

export default class Footer extends Component {
  constructor() {
    super();

    this.state = $store.subscribe({
        'todoList': 'todoList',
        'showingFilter': 'showingFilter'
      }).bind(this);
  }

  getPathClassName(path) {
    return (this.state.showingFilter.current == path) ? 'selected' : null;
  }

  clearCompleted() {
    $action.dynamic(() => {
      $store.todoList.clearCompleted();
    });
  }

  render() {
    return (
      <footer className="footer">
        <span className="todo-count"><strong>{this.state.todoList.activeSize}</strong> item left</span>
        <ul className="filters">
          <li>
            <a href="#/" className={this.getPathClassName('ALL')}>All</a>
          </li>
          <li>
            <a href="#/active" className={this.getPathClassName('ACTIVE')}>Active</a>
          </li>
          <li>
            <a href="#/completed" className={this.getPathClassName('COMPLETED')}>Completed</a>
          </li>
        </ul>
        <button className="clear-completed" onClick={this.clearCompleted}>Clear completed</button>
      </footer>
    );
  }
}
