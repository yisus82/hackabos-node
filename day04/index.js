'use strict';

const calculator = require('./calculator');

const { substract, multiply, divide } = calculator;

const resultSum = calculator.sum(5, 3);
const resultSub = substract(5, 3);

console.log(`resultSum: ${resultSum}`);
console.log(`resultSub: ${resultSub}`);

multiply(3, 4)
  .then((resultMul) => {
    console.log(`resultMul: ${resultMul}`);
  })
  .catch(err => console.error(`errorMul: ${err}`));

async function startDivision() {
  try {
    const resultDiv = await divide(6, 2);
    console.log(`resultDivAsync: ${resultDiv}`);
  } catch (err) {
    console.error(`errorDivAsync: ${err}`);
  }
}

startDivision();

divide(4, 0)
  .then((resultDiv) => {
    console.log(`resultDiv: ${resultDiv}`);
  })
  .catch(err => console.error(`errorDiv: ${err}`));
