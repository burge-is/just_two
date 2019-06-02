const hide = (object, property) => {
  Object.defineProperty(object, property, {
    writable: false,
    enumerable: false
  });
};

function get(array) {
  array.by = by;
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
    return result;
  }
}

module && (module.exports = get);
