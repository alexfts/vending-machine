const VendingMachine = require('../src/vendingMachine');

describe('VendingMachine', () => {
  let vendingMachine, inventory, coinStorage;
  beforeEach(() => {
    inventory = [
      {
        title: 'Chips',
        price: 3.25,
        quantity: 5,
        location: 'A1'
      },
      {
        title: 'Coke',
        price: 1.95,
        quantity: 7,
        location: 'B1'
      },
      {
        title: 'Pepsi',
        price: 2.0,
        quantity: 10,
        location: 'A2'
      },
      {
        title: 'Pringles',
        price: 3.0,
        quantity: 12,
        location: 'B3'
      },
      {
        title: 'Pretzels',
        price: 0.95,
        quantity: 4,
        location: 'B2'
      },
      {
        title: 'Apple Juice',
        price: 1.55,
        quantity: 7,
        location: 'C1'
      },
      {
        title: 'Orange Juice',
        price: 1.55,
        quantity: 7,
        location: 'C3'
      },
      {
        title: 'Veggie sticks',
        price: 2.3,
        quantity: 4,
        location: 'C4'
      },
      {
        title: 'Snickers',
        price: 4.2,
        quantity: 12,
        location: 'A3'
      },
      {
        title: 'Mars',
        price: 4,
        quantity: 11,
        location: 'A4'
      },
      {
        title: 'Hersheys',
        price: 8,
        quantity: 0,
        location: 'B4'
      }
    ];
    coinStorage = {
      0.05: 10,
      0.1: 10,
      0.25: 10,
      1.0: 10,
      2.0: 10
    };
    vendingMachine = new VendingMachine(inventory, coinStorage);
  });

  test('Vending machine undefined inventory', () => {
    vendingMachine.inventory = undefined;
    expect(() => vendingMachine.getInventory()).toThrow('Empty inventory');
  });
  test('Vending machine empty inventory', () => {
    vendingMachine.inventory = [];
    expect(() => vendingMachine.getInventory()).toThrow('Empty inventory');
  });
  test('Vending machine full inventory', () => {
    const inventoryDescription = [
      'Chips: price 3.25, quantity: 5, location: A1',
      'Coke: price 1.95, quantity: 7, location: B1',
      'Pepsi: price 2, quantity: 10, location: A2',
      'Pringles: price 3, quantity: 12, location: B3',
      'Pretzels: price 0.95, quantity: 4, location: B2',
      'Apple Juice: price 1.55, quantity: 7, location: C1',
      'Orange Juice: price 1.55, quantity: 7, location: C3',
      'Veggie sticks: price 2.3, quantity: 4, location: C4',
      'Snickers: price 4.2, quantity: 12, location: A3',
      'Mars: price 4, quantity: 11, location: A4',
      'Hersheys: price 8, quantity: 0, location: B4'
    ].join('\n');
    expect(vendingMachine.getInventory()).toEqual(inventoryDescription);
  });
  test('Vending machine inventory without location', () => {
    vendingMachine.inventory.push({
      title: 'Hersheys',
      price: 8,
      quantity: 0,
      location: null
    });
    expect(() => vendingMachine.getInventory()).toThrow('Invalid inventory');
  });
  test('Vending machine inventory without title', () => {
    vendingMachine.inventory.push({
      price: 8,
      quantity: 0,
      location: 'D1'
    });
    expect(() => vendingMachine.getInventory()).toThrow('Invalid inventory');
  });
  test('Vending machine inventory without price', () => {
    vendingMachine.inventory.push({
      title: 'Hersheys',
      quantity: 0,
      location: 'D1'
    });
    expect(() => vendingMachine.getInventory()).toThrow('Invalid inventory');
  });

  test('refillInventory(null, 5)', () => {
    expect(() => vendingMachine.refillInventory(null, 5)).toThrow(
      'Invalid product title'
    );
    expect(vendingMachine.inventory).toEqual(inventory);
  });
  test('refillInventory("abc", 5)', () => {
    expect(() => vendingMachine.refillInventory('abc', 5)).toThrow(
      'Invalid product title'
    );
    expect(vendingMachine.inventory).toEqual(inventory);
  });
  test('refillInventory("Chips", "five")', () => {
    expect(() => vendingMachine.refillInventory('Chips', 'five')).toThrow(
      'Invalid quantity'
    );
    expect(vendingMachine.inventory).toEqual(inventory);
  });
  test('refillInventory("Chips", 4.5)', () => {
    expect(() => vendingMachine.refillInventory('Chips', 4.5)).toThrow(
      'Invalid quantity'
    );
    expect(vendingMachine.inventory).toEqual(inventory);
  });
  test('refillInventory("Chips", 4)', () => {
    vendingMachine.refillInventory('Chips', 4);
    const chips = vendingMachine.inventory[0];
    expect(chips.quantity).toEqual(9);
    expect(vendingMachine.inventory.slice(1)).toEqual(inventory.slice(1));
  });
  test('refillInventory("Hersheys", 6)', () => {
    vendingMachine.refillInventory('Hersheys', 6);
    const hersheys = vendingMachine.inventory[10];
    expect(hersheys.quantity).toEqual(6);
    expect(vendingMachine.inventory.slice(0, 10)).toEqual(
      inventory.slice(0, 10)
    );
  });

  test('addChange({})', () => {
    vendingMachine.addChange({});
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange()', () => {
    expect(() => vendingMachine.addChange()).toThrow('Invalid change format');
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange("foo")', () => {
    expect(() => vendingMachine.addChange('foo')).toThrow(
      'Invalid change format'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 10: 1})', () => {
    expect(() => vendingMachine.addChange({ 0.05: 11, 10: 1 })).toThrow(
      'Invalid denomination'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 0.25: 3.2})', () => {
    expect(() => vendingMachine.addChange({ 0.05: 11, 0.25: 3.2 })).toThrow(
      'Invalid change quantity'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 0.25: null})', () => {
    expect(() => vendingMachine.addChange({ 0.05: 11, 0.25: null })).toThrow(
      'Invalid change quantity'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 0.25: "foo"})', () => {
    expect(() => vendingMachine.addChange({ 0.05: 11, 0.25: 'foo' })).toThrow(
      'Invalid change quantity'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 0.25: -1})', () => {
    expect(() => vendingMachine.addChange({ 0.05: 11, 0.25: -1 })).toThrow(
      'Invalid change quantity'
    );
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });
  test('addChange({0.05: 11, 1: 20})', () => {
    vendingMachine.addChange({ 0.05: 11, 1: 20 });
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 21,
      0.1: 10,
      0.25: 10,
      1.0: 30,
      2.0: 10
    });
  });

  test('dispenseInventory(null, {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory(null, { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory("", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('', { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory("Z4", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('Z4', { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory("A1B", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('A1B', { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory(5, {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory(5, { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory("a1", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('a1', { 0.25: 4 })).toThrow(
      'Invalid code'
    );
  });
  test('dispenseInventory("B4", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('B4', { 0.25: 4 })).toThrow(
      'Out of stock'
    );
  });
  test('dispenseInventory("A2")', () => {
    expect(() => vendingMachine.dispenseInventory('A2')).toThrow(
      'Invalid change format'
    );
  });
  test('dispenseInventory("A2", "foo")', () => {
    expect(() => vendingMachine.dispenseInventory('A2', 'foo')).toThrow(
      'Invalid change format'
    );
  });
  test('dispenseInventory("A2", {0.25: 2, 3: 1})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 2, 3: 1 })
    ).toThrow('Invalid denomination');
  });
  test('dispenseInventory("A2", {0.25: 2, 1: "foo"})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: 'foo' })
    ).toThrow('Invalid change quantity');
  });
  test('dispenseInventory("A2", {0.25: 2, 1: 2.00001})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: 2.00001 })
    ).toThrow('Invalid change quantity');
  });
  test('dispenseInventory("A2", {0.25: 2, 1: -1})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: -1 })
    ).toThrow('Invalid change quantity');
  });

  test('dispenseInventory("A2", {})', () => {
    expect(() => vendingMachine.dispenseInventory('A2', {})).toThrow(
      'Insufficient funds'
    );
  });
  test('dispenseInventory("A2", {0.25: 4})', () => {
    expect(() => vendingMachine.dispenseInventory('A2', { 0.25: 4 })).toThrow(
      'Insufficient funds'
    );
  });
  test('dispenseInventory("A2", {0.25: 4, 0.05: 19})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 4, 0.05: 19 })
    ).toThrow('Insufficient funds');
  });

  // Exact change
  test('dispenseInventory("A2", {0.25: 4, 0.05: 20})', () => {
    expect(
      vendingMachine.dispenseInventory('A2', { 0.25: 4, 0.05: 20 })
    ).toEqual(
      'You bought: Pepsi (price: 2.00, location: A2). You paid: $2.00. No change returned.'
    );
    expect(vendingMachine.inventory[2].quantity).toEqual(9);
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 30,
      0.1: 10,
      0.25: 14,
      1: 10,
      2: 10
    });
  });

  test('dispenseInventory("B1", {0.25: 4, 0.05: 19})', () => {
    // math rounding for floats
    expect(
      vendingMachine.dispenseInventory('B1', { 0.25: 4, 0.05: 19 })
    ).toEqual(
      'You bought: Coke (price: 1.95, location: B1). You paid: $1.95. No change returned.'
    );
    expect(vendingMachine.inventory[1].quantity).toEqual(6);
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 29,
      0.1: 10,
      0.25: 14,
      1: 10,
      2: 10
    });
  });

  // not enough change
  test('dispenseInventory("A2", {0.25: 4, 0.05: 20, 2: 100})', () => {
    expect(() =>
      vendingMachine.dispenseInventory('A2', { 0.25: 4, 0.05: 20, 2: 100 })
    ).toThrow('Not enough change to return. Please use exact change.');
    expect(vendingMachine.inventory[2].quantity).toEqual(10);
    expect(vendingMachine.coinStorage).toEqual(coinStorage);
  });

  test('dispenseInventory("B2", {0.25: 4, 0.1: 9})', () => {
    vendingMachine.coinStorage = {
      0.05: 2,
      0.1: 3,
      0.25: 1,
      1: 1,
      2: 1
    };
    expect(() =>
      vendingMachine.dispenseInventory('B2', { 0.25: 4, 0.1: 9 })
    ).toThrow('Not enough change to return. Please use exact change.');
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 2,
      0.1: 3,
      0.25: 1,
      1: 1,
      2: 1
    });
  });

  // enough change, return exactly greedy
  test('dispenseInventory("B3", {1: 2, 0.25: 5, 0.1: 3, 0.05: 2})', () => {
    vendingMachine.coinStorage = {
      0.05: 1,
      0.1: 1,
      0.25: 2,
      1: 1,
      2: 1
    };
    expect(
      vendingMachine.dispenseInventory('B3', { 1: 2, 0.25: 5, 0.1: 3, 0.05: 2 })
    ).toEqual(
      'You bought: Pringles (price: 3.00, location: B3). You paid: $3.65. Your change is: 2 quarters, 1 dimes, 1 nickels.'
    );
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 2,
      0.1: 3,
      0.25: 5,
      1: 3,
      2: 1
    });
  });

  // enough change, but not exactly according to the greedy algorithm
  test('dispenseInventory("B3", {1: 2, 0.25: 5, 0.1: 3, 0.05: 2})', () => {
    vendingMachine.coinStorage = {
      0.05: 5,
      0.1: 2,
      0.25: 1,
      1: 1,
      2: 1
    };
    expect(
      vendingMachine.dispenseInventory('B3', { 1: 2, 0.25: 5, 0.1: 3, 0.05: 2 })
    ).toEqual(
      'You bought: Pringles (price: 3.00, location: B3). You paid: $3.65. Your change is: 1 quarters, 2 dimes, 4 nickels.'
    );
    expect(vendingMachine.coinStorage).toEqual({
      0.05: 3,
      0.1: 3,
      0.25: 5,
      1: 3,
      2: 1
    });
  });
});
