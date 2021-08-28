import bcrypt from 'bcrypt';

/**
 * @function verifyHash
 * @desc verifies if a hash and a cleartext password match
 * @param {String} password cleartext password
 * @param {String} hash hashed password
 * @return {Promise<Boolean>}
 */
function verifyHash(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

export default verifyHash;
