class VendingMachine {
  constructor(inventory, coinStorage) {
    if (!inventory || !(inventory instanceof Array)) {
      throw 'Invalid inventory';
    }
    if (inventory.length === 0) {
      throw 'Empty inventory';
    }
    inventory.forEach(({ title, price, location, quantity }) => {
      if (!title || !price || !location) {
        throw `Invalid inventory t/p/l ${title} ${price} ${location}`;
      }
      if (parseFloat(price).toFixed(2) !== price.toFixed(2) || price <= 0) {
        throw 'Invalid inventory: price not float';
      }
      if (parseInt(quantity) !== quantity || quantity < 0) {
        throw 'Invalid inventory: quantity not int';
      }
    });

    if (!(coinStorage instanceof Object)) throw 'Invalid coinStorage format';
    Object.keys(coinStorage).map(denomination => {
      const quantity = coinStorage[denomination];
      if (!parseFloat(denomination) || denomination <= 0) {
        throw `Invalid denomination within coinStorage ${denomination}`;
      }
      if (parseInt(quantity) !== quantity || quantity <= 0) {
        throw 'Invalid quantity within coinStorage';
      }
    });
    this.coinStorage = coinStorage;
    this.inventory = inventory;
  }

  getInventory() {
    return this.inventory
      .map(
        product =>
          `${product.title}: price ${product.price}, quantity: ${
            product.quantity
          }, location: ${product.location}`
      )
      .join('\n');
  }

  refillInventory(productTitle, quantity) {
    const product = this.inventory.find(
      product => product.title === productTitle
    );
    if (!product) {
      throw 'Invalid product title';
    }
    if (parseInt(quantity) !== quantity) {
      throw 'Invalid quantity';
    }
    product.quantity += quantity;
  }

  validateChange(change) {
    if (!(change instanceof Object)) {
      throw 'Invalid change format';
    }
    Object.keys(change).map(denomination => {
      if (!this.coinStorage[denomination]) {
        throw 'Invalid denomination';
      }
      const quantity = change[denomination];
      if (parseInt(quantity) !== quantity || quantity <= 0) {
        throw 'Invalid change quantity';
      }
    });
  }

  addChange(change) {
    this.validateChange(change);
    Object.keys(change).map(denomination => {
      const quantity = change[denomination];
      this.coinStorage[denomination] += quantity;
    });
  }

  getChangeAmount(change) {
    this.validateChange(change);
    const amount = Object.keys(change).reduce((changeAmt, denomination) => {
      const quantity = change[denomination];
      return changeAmt + denomination * quantity;
    }, 0);
    return amount.toFixed(2);
  }

  getChangeToReturn(changeAmount) {
    changeAmount = changeAmount.toFixed(2);
    const denominations = this.getDenominationsDescendingOrder();
    const result = denominations.reduce((acc, denomination) => {
      const availableQuantity = this.coinStorage[denomination];
      const maxQuantity = Math.floor(changeAmount / denomination);
      const quantity = Math.min(availableQuantity, maxQuantity);
      acc[denomination] = quantity;
      changeAmount -= denomination * quantity;
      return acc;
    }, {});

    if (changeAmount >= denominations[denominations.length - 1]) {
      throw 'Not enough change to return. Please use exact change.';
    }
    return result;
  }

  getDenominationsDescendingOrder() {
    return Object.keys(this.coinStorage).sort((a, b) => b - a);
  }

  getReturnedChangeDescription(change) {
    const denominations = this.getDenominationsDescendingOrder();
    const names = {
      2: 'toonies',
      1: 'loonies',
      0.25: 'quarters',
      0.1: 'dimes',
      0.05: 'nickels'
    };
    const desc = denominations
      .filter(denomination => change[denomination] > 0)
      .map(denomination => `${change[denomination]} ${names[denomination]}`)
      .join(', ');
    return desc === '' ? 'No change returned.' : `Your change is: ${desc}.`;
  }

  updateCoinStorage(gainedChange, lostChange) {
    Object.keys(gainedChange).map(denom => {
      this.coinStorage[denom] += gainedChange[denom];
    });
    Object.keys(lostChange).map(denom => {
      this.coinStorage[denom] -= lostChange[denom];
    });
  }

  dispenseInventory(code, change) {
    const product = this.inventory.find(prod => prod.location === code);
    if (!product) throw 'Invalid code';
    if (product.quantity === 0) throw 'Out of stock';

    const price = product.price.toFixed(2);
    const changeAmount = this.getChangeAmount(change);
    if (changeAmount < price) throw 'Insufficient funds';
    const changeToReturn = this.getChangeToReturn(changeAmount - price);
    const changeDescription = this.getReturnedChangeDescription(changeToReturn);
    product.quantity -= 1;
    this.updateCoinStorage(change, changeToReturn);
    return `You bought: ${product.title} (price: ${price}, location: ${
      product.location
    }). You paid: $${changeAmount}. ${changeDescription}`;
  }
}

module.exports = VendingMachine;
