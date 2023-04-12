export const validatePayload = (payload: any) => {
  const unusedStatuses = ['in_progress', 'queued'];

  return Object.keys(payload)
    .map(key => {
      if (
        Object.prototype.toString.call(payload[key]) === '[object Object]' &&
        Object.keys(payload[key]).includes('status')
      ) {
        return !unusedStatuses.includes(payload[key].status);
      } else {
        if (key.includes('project')) {
          return false;
        }
        if (key === 'pusher' && payload.deleted) {
          return false;
        }
        return true;
      }
    })
    .every(value => value);
};
