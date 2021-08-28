import HttpError from '../error/HttpError';

/**
 * @function decodeBasicAuth
 * @param {{}}headers HttpHeaders from a request
 * @desc retrieves basic auth header and decodes username and password
 * @return {{password: string, username: string}}
 */
function decodeBasicAuth(headers) {
  if (headers == null) throw HttpError.Unauthorized('No headers present');
  const { authorization } = headers;
  if (authorization == null) throw HttpError.Unauthorized('No authorization header present');

  const tmp = authorization.split(' ');
  if (tmp.length !== 2) throw HttpError.Unauthorized('authorization header malformed');
  const buf = Buffer.from(tmp[1], 'base64');
  const decodedAuth = buf.toString();
  const creds = decodedAuth.split(':'); // split on a ':'
  if (creds.length !== 2) throw new HttpError.Unauthorized('authorization header malformed');

  const username = creds[0].toString();
  const password = creds[1].toString();

  return { username, password };
}

export default decodeBasicAuth;
