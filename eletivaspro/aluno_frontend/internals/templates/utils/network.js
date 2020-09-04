import camelCase from 'lodash/fp/camelCase';
import isArray from 'lodash/fp/isArray';
import isEmpty from 'lodash/fp/isEmpty';
import isObjectLike from 'lodash/fp/isObjectLike';
import isPlainObject from 'lodash/fp/isPlainObject';
import map from 'lodash/fp/map';
import snakeCase from 'lodash/fp/snakeCase';
import set from 'lodash/set';
import transform from 'lodash/transform';

const createIteratee = (converter, self) => (result, value, key) =>
  set(result, converter(key), isObjectLike(value) ? self(value) : value);

const curryCase = keyConverter =>
  function node(element) {
    if (isArray(element)) return map(node, element);
    if (isPlainObject(element))
      return transform(element, createIteratee(keyConverter, node));
    return element;
  };

const mapToCamelCase = curryCase(camelCase);
const mapToSnakeCase = curryCase(snakeCase);

const requestToSnakeCase = (request, header) => {
  if (header.disableTransform) {
    delete header.disableTransform;
    return request;
  }
  return mapToSnakeCase(request);
};

const responseToCamelCase = response => {
  if (isEmpty(response)) return {};
  return mapToCamelCase(JSON.parse(response));
};

export { requestToSnakeCase, responseToCamelCase };
