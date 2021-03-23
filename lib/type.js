const t = [
  'Function',
  'String',
  'Error',
  'Object',
  'Array'
].reduce((o, name) => {
  o['is' + name] = _ => toString.call(_) == '[object ' + name + ']';
  return o;
}, {});

const { 
  isFunction,
  isString,
  isError,
  isObject,
  isArray
} = t;

const isNumber = _ => typeof _ == 'number' && !isNaN(_);

export {
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray
};
