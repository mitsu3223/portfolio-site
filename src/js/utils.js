export const isEmptyNodeList = nodeList => {
  if (isObject(nodeList) && nodeList.length > 0) {
    return true;
  }
  return false;
};

export const isObject = value => {
  return value !== null && typeof value === 'object';
}