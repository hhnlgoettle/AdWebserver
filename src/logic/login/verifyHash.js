import bcrypt from 'bcrypt';

function verifyHash(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

export default verifyHash;
