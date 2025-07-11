export const cleanPayload = (data) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== '') {
      cleaned[key] = value;
    }
  }
  return cleaned;
};
    