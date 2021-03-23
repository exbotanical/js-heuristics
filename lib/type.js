const { 
  isFunction,
  isString,
  isError,
  isObject,
  isArray
} = [
  'Function',
  'String',
  'Number',
  'Error',
  'Object',
  'Array'
].reduce((o, name) => {
  o['is' + name] = x => toString.call(x) == '[object ' + name + ' ]';
    return o;
}, {});

const isNumber = _ => typeof _ == 'number' && !isNaN(_);

export {
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray
};
