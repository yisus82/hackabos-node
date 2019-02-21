'use strict';

function sum(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(num1 * num2), 1000);
  });
}

async function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error('Division by zero');
  }

  return num1 / num2;
}

module.exports = {
  sum,
  substract,
  multiply,
  divide,
};
