 export const convertArrayObjIntoArrOfStr = (values, arrayFields) => {
    const newValues = { ...values };
    for (const field of arrayFields) {
      const value = newValues[field];
      if (value?.length > 0) {
        const arrOfStr = value.map((item) => item.id || item.value);
        newValues[field] = arrOfStr;
      }
    }
    return newValues;
  };