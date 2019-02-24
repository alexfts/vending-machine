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

  describe('new VendingMachine(inventory, coinStorage)', () => {
    describe('Invalid inventory', () => {
      describe('when the inventory does not exists', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(undefined, coinStorage)).toThrow(
            'Invalid inventory'
          );
        });
      });
      describe('when the inventory is not an array', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine({ foo: 'bar' }, coinStorage)).toThrow(
            'Invalid inventory'
          );
        });
      });
      describe('when the inventory is empty', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine([], coinStorage)).toThrow(
            'Empty inventory'
          );
        });
      });
      describe('when the inventory is an array of non-objects', () => {
        it('should throw an error', () => {
          expect(
            () => new VendingMachine(['foo', 'bar', 5], coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has no location', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 8,
              quantity: 0,
              location: null
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has no title', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              price: 8,
              quantity: 0,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has no price', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              quantity: 0,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has no quantity', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 0.85,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a non-string title', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: {},
              price: 0.85,
              quantity: 2,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a non-string location', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 0.85,
              quantity: 2,
              location: 3
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a non-numeric price', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: '0.85',
              quantity: 2,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has an infinite price', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: Infinity,
              quantity: 2,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a negative price', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: -4,
              quantity: 2,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a non-integer quantity', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 0.85,
              quantity: 2.3,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has an infinite quantity', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 0.85,
              quantity: Infinity,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
      describe('when a product in inventory has a negative quantity', () => {
        it('should throw an error', () => {
          const invalidInventory = [
            ...inventory,
            {
              title: 'Hersheys',
              price: 0.85,
              quantity: -1,
              location: 'D1'
            }
          ];
          expect(
            () => new VendingMachine(invalidInventory, coinStorage)
          ).toThrow('Invalid inventory');
        });
      });
    });
    describe('Invalid coinStorage', () => {
      describe('when coinStorage does not exists', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, null)).toThrow(
            'Invalid coin storage'
          );
        });
      });
      describe('when coinStorage is not an object', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, 'foo')).toThrow(
            'Invalid coin storage'
          );
        });
      });
      describe('when coinStorage is an empty object', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, {})).toThrow(
            'Empty coin storage. Please add some change'
          );
        });
      });
      describe('when coinStorage contains non-numeric denomination', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, { foo: 5 })).toThrow(
            `Invalid denomination within coin storage`
          );
        });
      });
      describe('when coinStorage contains negative denomination', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, { '-0.25': 5 })).toThrow(
            `Invalid denomination within coin storage`
          );
        });
      });
      describe('when coinStorage contains non-integer quantity', () => {
        it('should throw an error', () => {
          expect(
            () => new VendingMachine(inventory, { 0.25: 5.00001 })
          ).toThrow(`Invalid quantity within coin storage`);
        });
      });
      describe('when coinStorage contains negative quantity', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, { 0.25: -2 })).toThrow(
            `Invalid quantity within coin storage`
          );
        });
      });
      describe('when coinStorage contains zero quantity', () => {
        it('should throw an error', () => {
          expect(() => new VendingMachine(inventory, { 0.25: 0 })).toThrow(
            `Invalid quantity within coin storage`
          );
        });
      });
    });
    describe('Valid inputs for inventory and coinStorage', () => {
      it('should set inventory and coinStorage successfully', () => {
        expect(vendingMachine.inventory).toEqual(inventory);
        expect(vendingMachine.coinStorage).toEqual(coinStorage);
      });
    });
  });

  describe('getInventory()', () => {
    describe('when the inventory contains a single product', () => {
      it('should return a single-line description', () => {
        const inventoryDescription =
          'Chips: price 3.25, quantity: 5, location: A1';
        vendingMachine = new VendingMachine([inventory[0]], coinStorage);
        expect(vendingMachine.getInventory()).toEqual(inventoryDescription);
      });
    });
    describe('when the inventory contains multiple products', () => {
      it('should return a multi-line description', () => {
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
    });
  });

  describe('refillInventory(productTitle, quantity)', () => {
    describe('Invalid inputs', () => {
      describe('when there is no product title', () => {
        it('should throw an error and not affect the inventory', () => {
          expect(() => vendingMachine.refillInventory(null, 5)).toThrow(
            'Invalid product title'
          );
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when product title is not in the inventory', () => {
        it('should throw an error and not affect the inventory', () => {
          expect(() => vendingMachine.refillInventory('abc', 5)).toThrow(
            'Invalid product title'
          );
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when product quantity is not numeric', () => {
        it('should throw an error and not affect the inventory', () => {
          expect(() => vendingMachine.refillInventory('Chips', '5')).toThrow(
            'Invalid quantity'
          );
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when product quantity is a float', () => {
        it('should throw an error and not affect the inventory', () => {
          expect(() => vendingMachine.refillInventory('Chips', 4.5)).toThrow(
            'Invalid quantity'
          );
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when product quantity is a negative integer', () => {
        it('should throw an error and not affect the inventory', () => {
          expect(() => vendingMachine.refillInventory('Chips', -1)).toThrow(
            'Invalid quantity'
          );
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
    });
    describe('Valid inputs', () => {
      describe('when refilling a product that has 0 quantity', () => {
        it('should return the correct quantity and not affect the rest of inventory', () => {
          vendingMachine.refillInventory('Hersheys', 6);
          const hersheys = vendingMachine.inventory[10];
          expect(hersheys.quantity).toEqual(6);
          expect(vendingMachine.inventory.slice(0, 10)).toEqual(
            inventory.slice(0, 10)
          );
        });
      });
      describe('when refilling a product that has non-zero quantity', () => {
        it('should return the correct quantity and not affect the rest of inventory', () => {
          vendingMachine.refillInventory('Chips', 4);
          const chips = vendingMachine.inventory[0];
          expect(chips.quantity).toEqual(9);
          expect(vendingMachine.inventory.slice(1)).toEqual(inventory.slice(1));
        });
      });
    });
  });

  describe('addChange(change)', () => {
    describe('Invalid change input', () => {
      describe('when the change is undefined', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() => vendingMachine.addChange()).toThrow(
            'Invalid change format'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when the change is not an object', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() => vendingMachine.addChange('foo')).toThrow(
            'Invalid change format'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when the change contains a non-numeric denomination', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() => vendingMachine.addChange({ 0.05: 11, foo: 1 })).toThrow(
            'Invalid denomination'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when the change contains a denomination not present in coinStorage', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() => vendingMachine.addChange({ 0.05: 11, 10: 1 })).toThrow(
            'Invalid denomination'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when a denomination quantity is absent', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() =>
            vendingMachine.addChange({ 0.05: 11, 0.25: null })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when a denomination quantity is non-numeric', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() =>
            vendingMachine.addChange({ 0.05: 11, 0.25: 'foo' })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when a denomination quantity is a non-integer', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() =>
            vendingMachine.addChange({ 0.05: 11, 0.25: 3.01 })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when a denomination quantity is a negative integer', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() =>
            vendingMachine.addChange({ 0.05: 11, 0.25: -1 })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when a denomination quantity is 0', () => {
        it('should throw an error and preserve the original coinStorage', () => {
          expect(() => vendingMachine.addChange({ 0.05: 11, 0.25: 0 })).toThrow(
            'Invalid change quantity'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
    });
    describe('Valid change input', () => {
      describe('when the change is an empty object', () => {
        it('should preserve the original coinStorage', () => {
          vendingMachine.addChange({});
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when the change contains valid denominations and quantities', () => {
        it('should add change to coinStorage', () => {
          vendingMachine.addChange({ 0.05: 11, 1: 20 });
          expect(vendingMachine.coinStorage).toEqual({
            0.05: 21,
            0.1: 10,
            0.25: 10,
            1.0: 30,
            2.0: 10
          });
        });
      });
    });
  });

  describe('dispenseInventory(code, change)', () => {
    describe('Invalid inputs', () => {
      describe('when the code is not provided', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory(null, { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the code is not a string', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory(5, { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the code is an empty string', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('', { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the code is not a valid location', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A1B', { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the code is in lowercase', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('a1', { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the code is not contained in the inventory', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('Z4', { 0.25: 4 })
          ).toThrow('Invalid code');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when no change is provided', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() => vendingMachine.dispenseInventory('A2')).toThrow(
            'Invalid change format'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when change is not an object', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() => vendingMachine.dispenseInventory('A2', 'foo')).toThrow(
            'Invalid change format'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when change contains non-numeric denomination', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 2, foo: 1 })
          ).toThrow('Invalid denomination');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when change contains denomination not listed in coinStorage', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 2, 3: 1 })
          ).toThrow('Invalid denomination');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when change contains non-numeric denomination quantity', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: 'foo' })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when change contains non-integer denomination quantity', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: 2.00001 })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when denomination quantity is a negative integer', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 2, 1: -1 })
          ).toThrow('Invalid change quantity');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
    });
    describe('Valid inputs, inventory not disposed', () => {
      describe('when change is an empty object', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() => vendingMachine.dispenseInventory('A2', {})).toThrow(
            'Insufficient funds'
          );
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the amount of change provided is smaller than price', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 4 })
          ).toThrow('Insufficient funds');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when the amount of change provided is slightly smaller than price and floats representing the price are imprecise', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', { 0.25: 4, 0.05: 19 })
          ).toThrow('Insufficient funds');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when inventory is out of stock', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('B4', { 0.25: 4 })
          ).toThrow('Out of stock');
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
      describe('when vending machine doesn\'t have enough change', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          expect(() =>
            vendingMachine.dispenseInventory('A2', {
              0.25: 4,
              0.05: 20,
              2: 100
            })
          ).toThrow('Not enough change to return. Please use exact change.');
          expect(vendingMachine.inventory).toEqual(inventory);
          expect(vendingMachine.coinStorage).toEqual(coinStorage);
        });
      });
      describe('when vending machine goes through all denominations and doesn\'t find enough change', () => {
        it('should throw an error and preserve the original inventory and coinStorage', () => {
          const testCoinStorage = {
            0.05: 2,
            0.1: 3,
            0.25: 1,
            1: 1,
            2: 1
          };
          vendingMachine.coinStorage = testCoinStorage;
          expect(() =>
            vendingMachine.dispenseInventory('B2', {
              2: 1,
              1: 1,
              0.25: 4,
              0.1: 9,
              0.05: 1
            })
          ).toThrow('Not enough change to return. Please use exact change.');
          expect(vendingMachine.coinStorage).toEqual(testCoinStorage);
          expect(vendingMachine.inventory).toEqual(inventory);
        });
      });
    });
    describe('Valid inputs, inventory disposed', () => {
      describe('Exact change', () => {
        describe('when exact change is provided', () => {
          let dispensed;
          beforeEach(() => {
            dispensed = vendingMachine.dispenseInventory('A2', {
              0.25: 4,
              0.05: 20
            });
          });
          it('should purchase the correct product, show how much was paid and say that no change was returned', () => {
            expect(dispensed).toEqual(
              'You bought: Pepsi (price: 2.00, location: A2). You paid: $2.00. No change returned.'
            );
          });
          it('should decrement the product quantity in inventory', () => {
            expect(vendingMachine.inventory[2].quantity).toEqual(9);
          });
          it('should add change to coinStorage', () => {
            expect(vendingMachine.coinStorage).toEqual({
              0.05: 30,
              0.1: 10,
              0.25: 14,
              1: 10,
              2: 10
            });
          });
          it('should not affect any other product in inventory', () => {
            expect([
              ...vendingMachine.inventory.slice(0, 2),
              ...vendingMachine.inventory.slice(3)
            ]).toEqual([...inventory.slice(0, 2), ...inventory.slice(3)]);
          });
        });
        describe('when exact change is provided, but cannot be presented as an exact float', () => {
          let dispensed;
          beforeEach(() => {
            dispensed = vendingMachine.dispenseInventory('B1', {
              0.25: 4,
              0.05: 19
            });
          });
          it('should purchase the correct product, show how much was paid and say that no change was returned', () => {
            expect(dispensed).toEqual(
              'You bought: Coke (price: 1.95, location: B1). You paid: $1.95. No change returned.'
            );
          });
          it('should decrement the product quantity in inventory', () => {
            expect(vendingMachine.inventory[1].quantity).toEqual(6);
          });
          it('should add change to coinStorage', () => {
            expect(vendingMachine.coinStorage).toEqual({
              0.05: 29,
              0.1: 10,
              0.25: 14,
              1: 10,
              2: 10
            });
          });
          it('should not affect any other product in inventory', () => {
            expect([
              ...vendingMachine.inventory.slice(0, 1),
              ...vendingMachine.inventory.slice(2)
            ]).toEqual([...inventory.slice(0, 1), ...inventory.slice(2)]);
          });
        });
      });

      describe('Should return change', () => {
        describe('when there is enough change according to the greedy algorithm', () => {
          let dispensed, testCoinStorage;
          beforeEach(() => {
            testCoinStorage = {
              0.05: 1,
              0.1: 1,
              0.25: 2,
              1: 1,
              2: 1
            };
            vendingMachine.coinStorage = testCoinStorage;
            dispensed = vendingMachine.dispenseInventory('B3', {
              1: 2,
              0.25: 5,
              0.1: 3,
              0.05: 2
            });
          });
          it('should purchase the correct product, show how much was paid and show the correct change', () => {
            expect(dispensed).toEqual(
              'You bought: Pringles (price: 3.00, location: B3). You paid: $3.65. Your change is: 2 quarters, 1 dimes, 1 nickels.'
            );
          });
          it('should decrement the product quantity in inventory', () => {
            expect(vendingMachine.inventory[3].quantity).toEqual(11);
          });
          it('should correctly add new change to coinStorage and remove the change returned to customer', () => {
            expect(vendingMachine.coinStorage).toEqual({
              0.05: 2,
              0.1: 3,
              0.25: 5,
              1: 3,
              2: 1
            });
          });
          it('should not affect any other product in inventory', () => {
            expect([
              ...vendingMachine.inventory.slice(0, 3),
              ...vendingMachine.inventory.slice(4)
            ]).toEqual([...inventory.slice(0, 3), ...inventory.slice(4)]);
          });
        });
        describe('when the change disposed is not the most optimal according to the greedy algorithm', () => {
          let dispensed, testCoinStorage;
          beforeEach(() => {
            testCoinStorage = {
              0.05: 5,
              0.1: 2,
              0.25: 1,
              1: 1,
              2: 1
            };
            vendingMachine.coinStorage = testCoinStorage;
            dispensed = vendingMachine.dispenseInventory('B3', {
              1: 2,
              0.25: 5,
              0.1: 3,
              0.05: 2
            });
          });
          it('should purchase the correct product, show how much was paid and show the correct change', () => {
            expect(dispensed).toEqual(
              'You bought: Pringles (price: 3.00, location: B3). You paid: $3.65. Your change is: 1 quarters, 2 dimes, 4 nickels.'
            );
          });
          it('should decrement the product quantity in inventory', () => {
            expect(vendingMachine.inventory[3].quantity).toEqual(11);
          });
          it('should correctly add new change to coinStorage and remove the change returned to customer', () => {
            expect(vendingMachine.coinStorage).toEqual({
              0.05: 3,
              0.1: 3,
              0.25: 5,
              1: 3,
              2: 1
            });
          });
          it('should not affect any other product in inventory', () => {
            expect([
              ...vendingMachine.inventory.slice(0, 3),
              ...vendingMachine.inventory.slice(4)
            ]).toEqual([...inventory.slice(0, 3), ...inventory.slice(4)]);
          });
        });
      });
    });
  });
});
