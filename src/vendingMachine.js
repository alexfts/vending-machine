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

  getChangeToReturn(changeAmount) {}

  dispenseInventory(code, change) {
    const product = this.inventory.find(prod => prod.location === code);
    if (!product) throw 'Invalid code';
    if (product.quantity === 0) throw 'Out of stock';
    const price = product.price.toFixed(2);
    const changeAmount = this.getChangeAmount(change);
    if (changeAmount < price) throw 'Insufficient funds';
    if (changeAmount === price) return `Success`;
    const changeToReturn = this.getChangeToReturn(changeAmount - price);
  }
}

module.exports = VendingMachine;
