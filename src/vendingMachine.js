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
        if (parseFloat(product.price) !== product.price || product.price < 0) {
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

  addChange(change) {
    if (!change || !(change instanceof Object)) {
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
    Object.keys(change).map(denomination => {
      const quantity = change[denomination];
      this.coinStorage[denomination] += quantity;
    });
  }

  dispenseInventory() {}
}

module.exports = VendingMachine;
