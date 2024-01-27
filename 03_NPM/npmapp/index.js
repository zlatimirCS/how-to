const _ = require("lodash");
const numbers = [33, 46, 76, 44, 12, 89, 100];

_.each(numbers, function (number, i) {
  console.log(number);
});

const person = {
  name: "Zlatimir",
  age: 33,
};

console.log(person.name);
