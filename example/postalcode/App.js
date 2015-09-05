import React, { Component } from 'react';
import Wuwei, { Graph, Gun }     from '../../src/Wuwei'

import DataSource      from './stores/DataSource'
import County          from './stores/County'
import Town            from './stores/Town'

import SelectCounty    from './actions/SelectCounty'
import SelectTown      from './actions/SelectTown'

// Define wuwei.
Wuwei.init(() => {
  Graph.setStore('dataSource', DataSource, []);
  Graph.setStore('county', County, ['dataSource']);
  Graph.setStore('town', Town, ['dataSource', 'county']);

  Gun.setAction('selectCounty', SelectCounty);
  Gun.setAction('selectTown', SelectTown);
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      county: Graph.getStore('county')
        .subscribe(county => { this.setState({county: county}) }),
      town: Graph.getStore('town')
        .subscribe(town => { this.setState({town: town}) })
    };
  }

  selectCounty(event) {
    Gun.getAction('selectCounty').fire(event.target.value);
  }

  selectTown(event) {
    Gun.getAction('selectTown').fire(event.target.value);
  }

  render() {
    return (
      <div>
        <h1>Postcode example</h1>

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
