const JustTwo = (function() {
  const hide = (object, property) => {
    Object.defineProperty(object, property, {
      // writable: false,
      enumerable: false
    });
  };

  function get(array) {
    array.by = by;
    array.and = array.by;
    array.or = function(input, value) {
      get(this.parent).by.existing = this;
      return value
        ? get(this.parent).by(input)(value)
        : get(this.parent).by(input);
    };
    
    hide(array, "or");
    hide(array, "by");
    hide(array, "and");
    return array;
  }
  function by(property, value) {
    if (this === undefined) {
      return;
    }
    const array = Object.values(this);
    let equals = value => compare(value, (a, b) => a === b);
    equals.equals = equals;

    const extras = {
      equals,
      greaterThan: test((a, b) => a > b),
      lessThan: test((a, b) => a < b),
      notEquals: test((a, b) => a !== b)
    };

    function test(fn) {
      return function(value) {
        return compare(value, fn);
      };
    }

    equals = Object.assign(equals, extras);
    Object.keys(extras).forEach(key => hide(equals, key));

    return value ? equals(value) : equals;
    
    function compare(value, fn) {
      const result = get(
        array.filter(
          //comparator ||
          arrayItem => {
            try {
              let result = arrayItem;
              const props = property.split(".");
              while (props.length) {
                const curr = props.shift();
                result = result[curr];
              }
              return fn(result, value);
            } catch (error) {
              //console.error(error);
              return false;
            }
          }
        )
      );

      while (by.existing && by.existing.length) {
        const current = by.existing.shift();
        if (!result.includes(current)) {
          result[result.length] = current;
        }
      }
      result.parent = array;
      hide(result, "parent");

      return result;
    }
  }

  return { get, by };
})();

module && (module.exports = JustTwo);
