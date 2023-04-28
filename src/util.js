export function isObject (obj) {
    return obj && typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  };