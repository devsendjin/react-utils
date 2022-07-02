const isPrimitive = (value: unknown): boolean => {
  const type = typeof value;
  return value == null || (type != 'object' && type != 'function');
};

const isMap = (value: any): value is Map<any, any> => {
  return ['clear', 'delete', 'entries', 'forEach', 'get', 'has', 'keys', 'set', 'size', 'values'].every(
    (v) => v in value
  );
};

export { isPrimitive, isMap };
