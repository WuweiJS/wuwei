import React, { Component } from 'react';
import Wuwei from '../../../src/Wuwei'

var { $store, $action } = Wuwei('todoApp');

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: $store.todoList.at(props.itemIndex).subscribe()
              .bind(this).state('item')
    }
  }

  handleToggle(event) {
    $action.dynamic(() => {
      let item = $store.todoList.at(this.props.itemIndex);

      if (event.target.checked) {
        item.setCompleted();
      } else {
        $store.selectAllFilter.setOff();
        item.setActive();
      }
    });
  }

  render() {
    let item =
      ( ($store.showingFilter.isAll()) ||
        ($store.showingFilter.isActive() && $store.todoList.at(this.props.itemIndex).isActive()) ||
        ($store.showingFilter.isCompleted() && $store.todoList.at(this.props.itemIndex).isCompleted()) ) ?
          <li>
            <div className="view">
              <input type="checkbox" className="toggle"
                onChange={this.handleToggle.bind(this)}
                checked={this.state.item.completed} />

              <label>{this.state.item.content}</label>

            <button className="destroy" onClick={this.props.handleDelete}></button>
            </div>
          </li> : null

    return item;
  }
}
