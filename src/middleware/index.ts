import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { IncomingMessage } from 'http';

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req: IncomingMessage & { cookies: NextApiRequestCookies }) {
  const parsedItems: { token?: string } = {};
  const cookie = req.headers['cookie'];
  if (cookie) {
    const cookiesItems = cookie.split(' ');
    cookiesItems.forEach(cookies => {
      const parsedItem = cookies.split('=');
      parsedItems[parsedItem[0] as keyof { token?: string | undefined }] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}

/*
 * @params {request} extracted from request response, {setLocalhost} your localhost address
 * @return {object} objects of protocol, host and origin
 */
export function absoluteUrl(
  req: IncomingMessage & { cookies: NextApiRequestCookies },
  setLocalhost = '',
) {
  let protocol = 'https:';
  let host = req ? req.headers['x-forwarded-host'] || req.headers['host'] : window?.location.host;
  if (host && host.indexOf('localhost') > -1) {
    if (setLocalhost) {
      host = setLocalhost;
    }
    protocol = 'http:';
  }

  return {
    protocol,
    host,
    origin: `${protocol}//${host}`,
    url: req,
  };
}
