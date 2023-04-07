import { IMPORTANT_KEYS } from 'types/Webhook/githubRequest';

export const extractData = (body: any) => {
  const payload = body;
  const update = Object.keys(payload).filter(key => IMPORTANT_KEYS.includes(key));
  const {
    sender: { login: actor },
  } = payload;

  return {
    actor,
    repo: payload?.repository?.name ?? '',
    payload,
    update,
  };
};
