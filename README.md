# Vending machine

This repository contains an API for a vending machine and 80 tests written in Jest covering the main required functionalities.

## ![80 tests passed](/images/80_passed.png?raw=true '80 tests passed')

---

## Test coverage

The tests cover each of the following functionalities:

1. Creating a new instance of the VendingMachine class given the inventory and change
2. Fetching all inventory of the vending machine in a single string description
3. Refilling the vending machine inventory
4. Adding change to the vending machine's storage
5. Dispensing the inventory based on the code entered and the change provided

Dispensing the inventory (step 5) includes the following checks:

1. Ensuring that the function inputs are correct
2. Ensuring that the amount of provided change is sufficient
3. Ensuring that the product is in stock
4. Ensuring that the vending machine has enough change to return
5. If the above conditions are met:
   ⋅⋅* Showing the purchased product, how much was paid and how much change was returned
   ⋅⋅* Decrementing the product quantity in inventory
   ⋅⋅* Returning the correct change to the user. Note that the implementation attempts to return the minimal amount of coins as per the greedy algorithm. Assuming the coin denominations will be the same as in the real world, this algorithm should suffice.
   ⋅⋅* Updating the available change in the vending machine
   ⋅⋅\* Ensuring the rest of inventory isn't affected

## Setup & Running Tests

To setup, run `npm install`
To run the tests, run `npm t`.
