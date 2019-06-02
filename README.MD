# what?
I woke up with a [haunting pun](https://www.youtube.com/watch?v=UVtpXvzzXiA) stuck in my head.  And thus just_two was born.

The original idea was that I was going to make a human readable array filter by chaining just two functions `get` and `by`
```
.
└── get( Array || Object )
    └── by( String )
// ie
.
└── get( swallows )
    └── by( "plummage" )
```
<details>
<summary>this is the array we are searching</summary>

<pre>
// i.e.
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
      birds: 3
    }
  }
];
</pre>
</details>

``` js
const getByColor = get(array).by("color");
getByColor("blue");
get(array).by("color")("blue");
get(array).by("color", "blue");
get(array).by("nest.birds", 4);
/* all return
[
  {
    test: 1,
    color: "blue",
    nest: {
      birds: 4
    }
  }
]
*/
```
When I stopped typing and looked up there were a couple more functions than the original two. This update allows for chaining more expressions using language like `and`, `or`, `equals`, `notEquals`, `greaterThan`, and `lessThan`.  The result is a human-readable array filter that isn't so anonymous-function-heavy.
```
.
└── get( Array || Object )
    └── by
        └── ...

( Array || Object ).
└── by
    ├── and
    ├── or
    ├── equals
    ├── notEquals
    ├── greaterThan
    ├── lessThan
```
``` js
get(array).by("color")("red").and('test', 1).or('test').equals(2).and('nest.birds').greaterThan(2);
/* returns
[
  {
    test: 1,
    color: "red",
    nest: {
      birds: 3
    }
  }
]
*/
```