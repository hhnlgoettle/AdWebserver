import util from 'util';
import fs from 'fs';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
/**
 * @module fsPromise
 * @desc promisify basic fs functions
 */
export default { readdir, unlink, rmdir };
