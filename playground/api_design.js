// Store
$store.create('foo', Foo).source('bar1', 'bar2', 'bar3')

// Store Subscribe
$store.foo.subscribe((foo) => {});

$store.foo.subscribe().bind(reactComponent).state('stateKey');

this.state = $store.subscribe({
  'stateKey1': 'foo',
  'stateKey2': 'bar'
}).bind(reactComponent)

$store.foo.setValue({});

// Abstract Data Structure
$store.createSet('foo_list', FooList)
      .itemClass(Foo)
      .itemSource('bar1', 'bar2', 'bar3')

$store.createSet('bar_list', BarList)
  .itemClass(BarList)
  .itemMapFrom('foo_list')
  .itemSource('bar1', 'bar2', 'bar3')

$store.createMultiSet('bar_list_set', BarList)
  .itemClass(BarList)
  .setBelongsTo('foo_list')
  .itemSource('bar1', 'bar2', 'bar3')

// Action
$action.dynamic(($store) => {

});

$action.shoot.fire('p1', 'p2')
