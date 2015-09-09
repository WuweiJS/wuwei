import React, { Component } from 'react';
import Wuwei from '../../../src/Wuwei'

var { $store, $action } = Wuwei('todoApp');

var ENTER_KEY = 13;

export default class Item extends Component {
  constructor() {
    super();

    this.state = {
      newItem: ''
    }
  }

  handleChange(event) {
    this.setState({newItem: event.target.value});
  }

  handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) { return; }

		event.preventDefault();

		var val = this.state.newItem.trim();

		if (val) {
			$action.dynamic(() => {
        $store.todoList.add().setValue({content: val});
      })
			this.setState({newItem: ''});
		}
	}

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" autofocus
          value={this.state.newItem}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleNewTodoKeyDown.bind(this)} />
      </header>
    );
  }
}
