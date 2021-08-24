import Customer from '../../models/Customer';
import HttpError from '../../error/HttpError';

export default function customerAuth(data) {
  return new Promise((resolve, reject) => {
    if (data == null) throw HttpError.Unauthorized('authorization is empty');
    Customer.findById(data._id)
      .then((user) => {
        if (user == null) reject(HttpError.Unauthorized('User not found'));
        if (user && user.confirmed !== true) reject(HttpError.Unauthorized('User awaits confirmation'));
        resolve(user);
      })
      .catch((err) => { reject(err); });
  });
}
