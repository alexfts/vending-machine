# Vending machine

This repository contains an API for a vending machine and 80 tests written in Jest for each of the following functionalities:

1. Creating a new instance of the VendingMachine class given the inventory and change
2. Fetching all inventory of the vending machine in a single string description
3. Refilling the vending machine inventory
4. Adding change to the vending machine's storage
5. Dispensing the inventory based on the code entered and the change provided, including:

- Ensuring that the function inputs are correct
- Ensuring that the amount of provided change is sufficient
- Ensuring that the product is in stock
- Ensuring that the vending machine has enough change to return
- If the above conditions are met:
  - Showing the purchased product, how much was paid and how much change was returned
  - Decrementing the product quantity in inventory
  - Updating the change in the vending machine
  - Ensuring the rest of inventory isn't affected

![80 tests passed](/images/80_passed.png?raw=true '80 tests passed')

## Setup & Running Tests

To setup, run `npm install`
To run the tests, run `npm t`.

## Test outputs

See below the screenshots of all tests from the terminal.
![Tests1](/images/tests1.png?raw=true 'Tests1')
![Tests2](/images/tests2.png?raw=true 'Tests2')
![Tests3](/images/tests3.png?raw=true 'Tests3')
![Tests4](/images/tests4.png?raw=true 'Tests4')
![Tests5](/images/tests5.png?raw=true 'Tests5')
