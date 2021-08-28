import jwt from 'jsonwebtoken';

const { JWT_PRIV_KEY } = process.env;

const expiresIn = '4h';

/**
 * @function generateToken
 * @desc generates a JWT token for a given payload
 * @param {Object} payload payload to sign
 * @return {Promise<String>} the token
 */
function generateToken(payload) {
  const opts = {
    algorithm: 'RS256',
    expiresIn,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_PRIV_KEY, opts, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export default generateToken;
