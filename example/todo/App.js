import React, { Component } from 'react';

import Header from './Components/Header'
import List   from './Components/List'
import Footer from './Components/Footer'

import Wuwei from '../../src/Wuwei'

import ShowingFilter   from './stores/ShowingFilter'
import SelectAllFilter from './stores/SelectAllFilter'
import TodoItem        from './stores/TodoItem'
import TodoList        from './stores/TodoList'

var { $store, $action } = Wuwei('todoApp');

$store.create('showingFilter', ShowingFilter);

$store.showingFilter.bindRoutes();

$store.create('selectAllFilter', SelectAllFilter);

$store.createSet('todoList', TodoList)
      .itemClass(TodoItem)
      .itemSource('selectAllFilter')

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectAllFilter: $store.selectAllFilter.subscribe().bind(this).state('selectAllFilter')
    }
  }

  handleToggle(event) {
    $action.dynamic(() => {
      $store.selectAllFilter.toggle();
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header />

  			<section className="main">
  				<input className="toggle-all" type="checkbox"
            onChange={this.handleToggle.bind(this)}
            checked={this.state.selectAllFilter.current} />
          <List />
  			</section>

        <Footer />
  		</section>
    );
  }
}
