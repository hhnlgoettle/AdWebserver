/**
 * populates req.user with an guest user object
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
export default async function addGuestUser(req, res, next) {
  try {
    req.user = { role: 'guest' };
    next();
  } catch (e) {
    next(e);
  }
}
