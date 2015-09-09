import React, { Component } from 'react';
import Item from './Item'
import Wuwei from '../../../src/Wuwei'

var { $store, $action } = Wuwei('todoApp');

export default class List extends Component {
  constructor() {
    super();

    this.state = {
      todoList: $store.todoList.subscribe().bind(this).state('todoList'),
      showingFilter: $store.showingFilter.subscribe().bind(this).state('showingFilter')
    }
  }

  handleDelete(index) {
    $action.dynamic(() => {
      $store.todoList.deleteAt(index);
    });
  }

  render() {
    let items = [];

    for (var i = 0; i < this.state.todoList.itemSize; i++) {
      items.push(<Item itemIndex={i}
                       key={$store.todoList.at(i).getName()}
                       handleDelete={this.handleDelete.bind(this, i)}/>);
    }

    return (
      <ul className="todo-list">
        {items}
      </ul>
    );
  }
}
