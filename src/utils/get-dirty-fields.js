export const getDirtyFields = (oldData, newData) => {
  const dirtyFields = {};

  for (const key in newData) {
    if (key === 'id') continue;

    const oldValue =
      key === 'thumbnailImage'
        ? Array.isArray(oldData[key])
          ? oldData[key][0] || ''
          : oldData[key] || ''
        : oldData[key];

    const newValue = newData[key];

    if (Array.isArray(oldValue) && Array.isArray(newValue)) {
      const simplifiedOldValue = oldValue.map((val) => (typeof val === 'string' ? val : val.id));

      const isArrayDirty = JSON.stringify(newValue) !== JSON.stringify(simplifiedOldValue);

      if (isArrayDirty) {
        dirtyFields[key] = newValue;
      }
    } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      dirtyFields[key] = newValue;
    }
  }

  return { ...dirtyFields, id: newData.id };
};
