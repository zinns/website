export const validatePayload = (payload: any) => {
  const unusedStatuses = ['in_progress', 'queued'];

  return !Object.keys(payload)
    .map(key => {
      if (Object.keys(payload[key]).includes('status')) {
        return !unusedStatuses.includes(payload[key].status);
      } else {
        return true;
      }
    })
    .every(value => !value);
};
