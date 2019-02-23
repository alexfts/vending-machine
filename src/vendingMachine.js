class VendingMachine {
  constructor(inventory, coinStorage) {
    this.inventory = inventory;
    this.coinStorage = coinStorage;
  }

  getInventory() {
    if (!this.inventory || this.inventory.length === 0) {
      throw 'Empty inventory';
    }
    return this.inventory
      .map(product => {
        if (!product.title || !product.price || !product.location) {
          throw 'Invalid inventory';
        }
        if (parseFloat(product.price) !== product.price || product.price <= 0) {
          throw 'Invalid inventory';
        }
        return `${product.title}: price ${product.price}, quantity: ${
          product.quantity
        }, location: ${product.location}`;
      })
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
    const denominations = Object.keys(this.coinStorage).sort((a, b) => b - a);
    const result = {};
    for (let denomination of denominations) {
      const availableQuantity = this.coinStorage[denomination];
      const maxQuantity = Math.floor(changeAmount / denomination);
      const quantity = Math.min(availableQuantity, maxQuantity);
      result[denomination] = quantity;
      changeAmount -= denomination * quantity;
    }
    if (changeAmount >= denominations[denominations.length - 1]) {
      throw 'Not enough change to return. Please use exact change.';
    }
    return result;
  }

  getChangeDescription(change) {
    const denominations = Object.keys(this.coinStorage).sort((a, b) => b - a);
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
    const changeDescription = this.getChangeDescription(changeToReturn);
    product.quantity -= 1;
    this.updateCoinStorage(change, changeToReturn);
    return `You bought: ${product.title} (price: ${price}, location: ${
      product.location
    }). You paid: $${changeAmount}. ${changeDescription}`;
  }
}

module.exports = VendingMachine;
