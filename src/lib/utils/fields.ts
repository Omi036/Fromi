/**
 * Checks if every field in `field` is a member of `object`. If the field value in the object is undefined or does not exist, it will return false
 * @param {any} object Object that will be tested
 * @param {Array<string>} fields List of properties/methods the object should have
 * @returns {boolean} Whether the `object` has every field in `fields` or not
 */
function hasFields(object: any, fields: Array<string>): boolean {
  if (typeof object !== 'object' || object === null) return false;

  return fields.every(field => Object.prototype.hasOwnProperty.call(object, field));
}

export { hasFields }