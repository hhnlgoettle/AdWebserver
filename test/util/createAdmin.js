import Admin from '../../src/models/Admin';

function createAdmin(username, password) {
  const admin = new Admin();
  admin.username = username;
  admin.password = password;
  admin.role = 'admin';
  admin.confirmed = true;
  return new Promise((resolve, reject) => {
    admin.save()
      .then(() => {
        resolve(admin);
      }).catch((err) => {
        reject(err);
      });
  });
}

export default createAdmin;
