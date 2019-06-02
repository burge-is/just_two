const hide = (object, property) => {
  Object.defineProperty(object, property, {
    writable: false,
    enumerable: false
  });
};

function get(array, track) {
  array.by = Object.assign(by, { track });
  array.and = array.by;
  hide(array, "by");
  hide(array, "and");
  return array;

  function by(property, value) {
    //, comparator) {
    const result = get(
      array.filter(
        //comparator ||
        arrayItem => {
          try {
            let result = arrayItem;
            const props = property.split(".");
            while (props.length) {
              result = result[props.shift()];
            }
            return result === value;
          } catch (error) {
            //console.error(error);
            return false;
          }
        }
      ),
      by.track
    );
    if (by.track) {
      Object.assign(result, {
        parent: this,
        property,
        value
      });
      hide(array, "parent");
      hide(array, "property");
      hide(array, "value");
    }
    return result;
  }
}

module && (module.exports = get);
