const assert = require("assert");
const arr = [
  {
    test: 1,
    color: "blue",
    nest: {
      birds: 4
    }
  },
  {
    test: 1,
    color: "red"
  },
  {
    test: 2,
    color: "red"
  },
  {
    test: 1,
    color: "red",
    nest: {
      birds: 4
    }
  }
];
let subject;

// const get = require("./justTwo.evenSimpler.js");
// // Simple 1
// subject = get(arr, true).by("test", 1);
// console.log({ subject });
// assert(subject.length === 1, "Simple 1");
// // Nested 1
// subject = get(arr, true).by("nest.birds", 4);
// console.log({ subject });
// assert(subject.length === 1, "Nested 1");

const { get } = require("./justTwo.js");
(function Simple_2() {
  subject = get(arr).by("test")(1);
  assert(subject.length === 3);
})();
//
(function Nested_2() {
  const getByBirdCount = get(arr, true).by("nest.birds");
  subject = getByBirdCount(4);
  assert(subject.length === 2);
})();
(function Nested_Chain_2() {
  const getByBirdCount = get(arr, true).by("nest.birds");
  subject = get(arr, true)
    .by("test")
    .greaterThan(1)
    .and("color", "red");
  assert(subject.length === 1);

  subject = getByBirdCount(4)
    .by("test")(1)
    .and("color")("red");
  assert(subject.length === 1);

  subject = getByBirdCount(4)
    .by("test")
    .equals(1)
    .and("color")
    .equals("red");
  assert(subject.length === 1);

  subject = get(arr)
    .by("nest.birds")
    .greaterThan(3)
    .and("test")
    .equals(1)
    .and("color")
    .equals("red");
  assert(subject.length === 1);

  subject = get(arr)
    .by("nest.birds")
    .greaterThan(3)
    .and("test", 1)
    .and("color", "red");
  assert(subject.length === 1);

  subject = get(arr)
    .by("nest.birds")
    .greaterThan(3)
    .and("test")
    .equals(1)
    .and("color")
    .equals("red");
  assert(subject.length === 1);

  subject = get(arr)
    .by("test")(2)
    .or("color")("blue");
  assert(subject.length === 2);
  subject = get(arr).by("test")(2);
  subject = subject
    .or("color")("blue")
    .and("color", "blue");
  assert(subject.length === 1);

  subject = get(arr)
    .by("test")
    .lessThan(10)
    .or("color")("blue")
    .or("color")("red");
  assert(subject.length === 4);

  subject = get(arr)
    .by("nest.birds")
    .lessThan(10)
    .or("color")("red")
    .and("test", 1)
    .or("test")(2)
    .and("test")
    .equals(1);
  assert(subject.length === 3);
})();
// console.log(arr);
let test = [...arr];
assert(test.by === undefined);
assert(arr.by);
// fin
