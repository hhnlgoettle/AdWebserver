/**
 * @module
 * @function accessControl
 * @description sets header 'Access-Control-Allow-Methods'
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export default function accessControl(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,'
    + ' X-Access-Token, Access-Control-Allow-Credentials, Position');
  res.header('Access-Control-Expose-Headers', 'X-Requested-With, Token-Refresh, ETag');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
