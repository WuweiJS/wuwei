import React, { Component } from 'react';
import Wuwei from '../../src/Wuwei'

import DataSource      from './stores/DataSource'
import County          from './stores/County'
import Town            from './stores/Town'

var { $store, $action } = Wuwei('postalcodeApp');

(() => {
  // Set store & stores's path
  $store.create('dataSource', DataSource)
  $store.create('county', County).source('dataSource');
  $store.create('town', Town).source('dataSource', 'county');

  // load JSON
  $store.dataSource.load();
})();

export default class App extends Component {
  constructor() {
    super();

    this.state = $store.subscribe({
        'county': 'county',
        'town': 'town'
      }).bind(this);
  }

  selectCounty(event) {
    $action.dynamic(() => {
      $store.county.setValue({
        selected: event.target.value
      });
    });
  }

  selectTown(event) {
    $action.dynamic(() => {
      $store.town.setValue({
        selected: event.target.value
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Postalcode</h1>

        <h3>請選擇地區</h3>
        <select onChange={this.selectCounty} value={this.state.county.selected}>
          <option>選擇縣市</option>
          {this.state.county.list.map(function(county, i){
              return <option value={county}>{county}</option>;
          })}
        </select>

        { (this.state.town.list.length > 0) ?
          <select onChange={this.selectTown} value={this.state.town.selected}>
            <option>選擇鄉鎮</option>
            {this.state.town.list.map(function(town, i){
                return <option key={town} value={town}>{town}</option>;
            })}
          </select> : null}

        <h3>郵遞區號</h3>
        { (this.state.town.selected != null) ?
          <p>{this.state.town.codeTable[this.state.town.selected]}</p> : null}

      </div>
    );
  }
}
