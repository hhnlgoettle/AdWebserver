import Admin from '../../models/Admin';
import HttpError from '../../error/HttpError';

/**
 * @function adminAuth
 * @description authModule for #auth
 * <p>checks if user is an admin
 * <p> throws error if user is null, not confirmed or not an admin
 * @param data
 * @return {Promise<Admin>}
 */
export default function adminAuth(data) {
  return new Promise((resolve, reject) => {
    if (data == null) throw HttpError.Unauthorized('authorization is empty');
    Admin.findById(data._id)
      .then((user) => {
        if (user == null) reject(HttpError.Unauthorized('User not found'));
        if (user && user.confirmed !== true) reject(HttpError.Unauthorized('User awaits confirmation'));
        resolve(user);
      })
      .catch((err) => { reject(err); });
  });
}
