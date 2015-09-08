$store.create('foo', Foo).source('bar1', 'bar2', 'bar3')

$store.foo.subscribe((foo) => {});

$store.foo.subscribe().bind(reactComponent).state('stateKey');

this.state = $store.subscribe({
  'stateKey1': 'foo',
  'stateKey2': 'bar'
}).bind(reactComponent)

$store.foo.setValue({});

$store.createSet('foo_list', Foo).source('bar1', 'bar2', 'bar3')

$store.createSet('bar_list', Foo).itemBelongsTo('foo_list').itemSource('bar1', 'bar2', 'bar3')

$store.createMultiSet('bar_list_set', Foo).setBelongsTo('foo_list').itemSource('bar1', 'bar2', 'bar3')

$action.create('shoot', Shoot)


$action.dynamic(($store) => {

});

$action.shoot.fire('p1', 'p2')
