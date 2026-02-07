function hasFields(object, fields) {
  if (typeof object !== 'object' || object === null) return false;

  return fields.every(field => Object.prototype.hasOwnProperty.call(object, field));
}

export { hasFields }