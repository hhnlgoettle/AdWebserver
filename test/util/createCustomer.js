import Customer from '../../src/models/Customer';

function createCustomer(username, password) {
  const user = new Customer();
  user.username = username;
  user.password = password;
  user.role = 'customer';
  user.confirmed = true;
  return new Promise((resolve, reject) => {
    user.save()
      .then(() => {
        resolve(user);
      }).catch((err) => {
        reject(err);
      });
  });
}

export default createCustomer;
