export function isObject(obj) {
  return obj && typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};

export function isParentTo (target, parent) {
  let currentNode = target;
  while (currentNode !== null) {
    if (currentNode === parent) return true;
    currentNode = currentNode.parentNode;
  }
  return false;
}

export function getTypeFromSchema(target = null, schema) {
  if (target) {
    const tempTarget = target.split('.');
    tempTarget.shift();
    const value = getPath(schema, tempTarget.join('.'));
    if (value === types.Grid) return 'grid';
    if (value === types.Text) return 'text';
    if (value === types.Title) return 'text';
    if (value === types.Button) return 'button';
    if (value === types.ClassList) return 'section';
    if (value === String) return 'text';
    if (value === Number) return 'text';
  }

  return null;
}

export function getTypeFromTagName(tagName) {
  tagName = tagName.toUpperCase();

  switch (tagName) {
    case 'H1':
      return 'text';
    case 'H2':
      return 'text';
    case 'H3':
      return 'text';
    case 'H4':
      return 'text';
    case 'H5':
      return 'text';
    case 'H6':
      return 'text';
    case 'P':
      return 'text';
    case 'B':
      return 'text';
    case 'SPAN':
      return 'text';
    case 'BUTTON':
      return 'button';
    case 'A':
      return 'button';
    case 'SECTION':
      return 'section';
    case 'HEADER':
      return 'section';
    default:
      break;
  }
}